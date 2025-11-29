const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create SSL directory if it doesn't exist
const sslDir = path.join(__dirname, 'ssl');
if (!fs.existsSync(sslDir)) {
    fs.mkdirSync(sslDir);
}

// Generate OpenSSL configuration
const opensslConfig = `
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = US
ST = Mississippi
L = Jackson
O = Christmas Movies App
CN = localhost

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
IP.1 = 127.0.0.1
IP.2 = ::1
`;

fs.writeFileSync(path.join(sslDir, 'openssl.conf'), opensslConfig);

try {
    console.log('🔧 Generating trusted SSL certificate...');
    
    // Generate private key
    execSync(`openssl genrsa -out ${path.join(sslDir, 'private.key')} 2048`, { stdio: 'inherit' });
    
    // Generate certificate signing request
    execSync(`openssl req -new -key ${path.join(sslDir, 'private.key')} -out ${path.join(sslDir, 'cert.csr')} -config ${path.join(sslDir, 'openssl.conf')}`, { stdio: 'inherit' });
    
    // Generate self-signed certificate
    execSync(`openssl x509 -req -days 365 -in ${path.join(sslDir, 'cert.csr')} -signkey ${path.join(sslDir, 'private.key')} -out ${path.join(sslDir, 'certificate.crt')} -extensions v3_req -extfile ${path.join(sslDir, 'openssl.conf')}`, { stdio: 'inherit' });
    
    console.log('✅ SSL certificate generated successfully!');
    console.log('📁 Certificate files created in /ssl/ directory:');
    console.log('   - private.key (private key)');
    console.log('   - certificate.crt (certificate)');
    console.log('   - cert.csr (certificate signing request)');
    console.log('');
    console.log('🔒 To trust this certificate:');
    console.log('   Windows: Import certificate.crt to "Trusted Root Certification Authorities"');
    console.log('   macOS: Add certificate.crt to Keychain and trust it');
    console.log('   Linux: Add certificate.crt to /usr/local/share/ca-certificates/ and run update-ca-certificates');
    
    // Clean up temporary files
    fs.unlinkSync(path.join(sslDir, 'cert.csr'));
    fs.unlinkSync(path.join(sslDir, 'openssl.conf'));
    
} catch (error) {
    console.error('❌ OpenSSL not found or certificate generation failed:', error.message);
    console.log('');
    console.log('💡 Alternative solutions:');
    console.log('   1. Install OpenSSL: https://slproweb.com/products/Win32OpenSSL.html');
    console.log('   2. Use the self-signed certificate (browser will show warning)');
    console.log('   3. Use HTTP for development (http://localhost:3000)');
}