import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import CryptoJS from 'crypto-js';
import '../styles/PasswordDashboard.css';

const PasswordDashboard = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [breachCheck, setBreachCheck] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const analyzePassword = (pwd) => {
    if (!pwd) {
      setAnalysis(null);
      return;
    }

    const result = zxcvbn(pwd);
    const customAnalysis = {
      score: result.score,
      strength: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][result.score],
      crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
      feedback: result.feedback,
      entropy: calculateEntropy(pwd),
      patterns: detectPatterns(pwd),
      requirements: checkRequirements(pwd)
    };

    setAnalysis(customAnalysis);
  };

  const calculateEntropy = (pwd) => {
    const charset = getCharsetSize(pwd);
    return Math.log2(Math.pow(charset, pwd.length));
  };

  const getCharsetSize = (pwd) => {
    let size = 0;
    if (/[a-z]/.test(pwd)) size += 26;
    if (/[A-Z]/.test(pwd)) size += 26;
    if (/[0-9]/.test(pwd)) size += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) size += 32;
    return size;
  };

  const detectPatterns = (pwd) => {
    const patterns = {
      sequential: /(?:abc|bcd|cde|def|123|234|345|456|789)/i.test(pwd),
      repeated: /(.)\1{2,}/.test(pwd),
      keyboard: /(?:qwerty|asdf|zxcv|1234)/i.test(pwd),
      common: /(?:password|admin|user|login)/i.test(pwd)
    };
    return patterns;
  };

  const checkRequirements = (pwd) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[^a-zA-Z0-9]/.test(pwd) 
    };
  };

  const generateSecurePassword = (length = 16) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword();
    setGeneratedPassword(newPassword);
  };

  const useGeneratedPassword = () => {
    setPassword(generatedPassword);
    setGeneratedPassword('');
  };

  const checkBreaches = async (pwd) => {
    if (!pwd) return;
    
    // SHA-1 hash for HaveIBeenPwned API
    const hash = CryptoJS.SHA1(pwd).toString().toUpperCase();
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    
    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();
      
      const found = data.split('\n').find(line => line.startsWith(suffix));
      setBreachCheck({
        breached: !!found,
        count: found ? parseInt(found.split(':')[1]) : 0
      });
    } catch (error) {
      setBreachCheck({ error: 'Unable to check breaches' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        analyzePassword(password);
        checkBreaches(password);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [password]);

  return (
    <div className="password-dashboard">
      <h3>🔐 Password Security Dashboard</h3>
      
      {/* Password Input Section */}
      <div className="password-input-section">
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to analyze..."
            className="password-input"
          />
          <button 
            type="button"
            onClick={handleGeneratePassword}
            className="generate-btn"
          >
            🎲 Generate
          </button>
        </div>
      </div>

      {/* Generated Password Display */}
      {generatedPassword && (
        <div className="generated-password-section">
          <h4>🆕 Generated Password</h4>
          <div className="generated-password-container">
            <div className="generated-password-display">
              <code className="password-text">{generatedPassword}</code>
              <button 
                onClick={() => navigator.clipboard.writeText(generatedPassword)}
                className="copy-btn"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
            <div className="generated-password-actions">
              <button 
                onClick={useGeneratedPassword}
                className="use-password-btn"
              >
                ✅ Use This Password
              </button>
              <button 
                onClick={() => setGeneratedPassword('')}
                className="dismiss-btn"
              >
                ❌ Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="analysis-results">
          {/* Strength Meter */}
          <div className="strength-section">
            <h4>Password Strength</h4>
            <div className={`strength-meter strength-${analysis.score}`}>
              <div 
                className="strength-fill" 
                style={{ width: `${(analysis.score + 1) * 20}%` }}
              />
            </div>
            <div className="strength-label">{analysis.strength}</div>
          </div>

          {/* Security Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <h5>Entropy</h5>
              <div className="metric-value">{analysis.entropy.toFixed(1)} bits</div>
            </div>
            <div className="metric-card">
              <h5>Crack Time</h5>
              <div className="metric-value">{analysis.crackTime}</div>
            </div>
            <div className="metric-card">
              <h5>Length</h5>
              <div className="metric-value">{password.length} chars</div>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="requirements-section">
            <h4>Security Requirements</h4>
            <div className="requirements-grid">
              {Object.entries(analysis.requirements).map(([req, met]) => (
                <div key={req} className={`requirement ${met ? 'met' : 'unmet'}`}>
                  <span className="requirement-icon">{met ? '✅' : '❌'}</span>
                  <span className="requirement-text">
                    {req.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Detection */}
          <div className="patterns-section">
            <h4>Pattern Analysis</h4>
            <div className="patterns-grid">
              {Object.entries(analysis.patterns).map(([pattern, detected]) => (
                <div key={pattern} className={`pattern ${detected ? 'detected' : 'safe'}`}>
                  <span className="pattern-icon">{detected ? '⚠️' : '✅'}</span>
                  <span className="pattern-text">{pattern}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breach Check */}
          {breachCheck && (
            <div className="breach-section">
              <h4>Data Breach Check</h4>
              {breachCheck.error ? (
                <div className="breach-error">{breachCheck.error}</div>
              ) : (
                <div className={`breach-result ${breachCheck.breached ? 'breached' : 'safe'}`}>
                  {breachCheck.breached ? (
                    <>
                      <span className="breach-icon">🚨</span>
                      <span>Found in {breachCheck.count} data breaches!</span>
                    </>
                  ) : (
                    <>
                      <span className="breach-icon">✅</span>
                      <span>Not found in known breaches</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordDashboard;