import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 15% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
      `,
    },
    card: {
      position: 'relative',
      zIndex: 10,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '32px',
      padding: '60px',
      width: '100%',
      maxWidth: '480px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'fadeIn 0.6s ease-out',
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '24px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '12px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#cbd5e1',
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    inputGroup: {
      position: 'relative',
    },
    inputLabel: {
      position: 'absolute',
      top: '-10px',
      left: '16px',
      background: '#0f172a',
      padding: '0 8px',
      fontSize: '14px',
      color: '#cbd5e1',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '20px 24px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '16px',
      color: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    inputFocus: {
      ':focus': {
        borderColor: '#10b981',
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
      },
    },
    rememberForgot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      borderRadius: '6px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      background: '#10b981',
      borderColor: '#10b981',
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#cbd5e1',
      cursor: 'pointer',
    },
    forgotLink: {
      fontSize: '14px',
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      ':hover': {
        color: '#60a5fa',
        textDecoration: 'underline',
      },
    },
    submitButton: {
      width: '100%',
      padding: '20px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '8px',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4)',
      },
      ':disabled': {
        opacity: '0.7',
        cursor: 'not-allowed',
        transform: 'none',
      },
    },
    buttonText: {
      display: 'inline-block',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '32px 0',
      color: '#64748b',
      fontSize: '14px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
      padding: '0 16px',
    },
    socialButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '32px',
    },
    socialButton: {
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      fontWeight: '500',
      color: '#cbd5e1',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
      },
    },
    socialIcon: {
      fontSize: '20px',
    },
    signupLink: {
      textAlign: 'center',
      fontSize: '15px',
      color: '#cbd5e1',
    },
    signupLinkAction: {
      color: '#10b981',
      fontWeight: '600',
      textDecoration: 'none',
      marginLeft: '8px',
      transition: 'all 0.3s ease',
      ':hover': {
        color: '#34d399',
        textDecoration: 'underline',
      },
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTopColor: 'white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={{ fontSize: '40px' }}>🌱</span>
            PRAKRITIPATH
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            Continue your sustainable journey and track your eco-impact
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{...styles.input, ...styles.inputFocus}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={{...styles.input, ...styles.inputFocus}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={styles.rememberForgot}>
            <div style={styles.checkboxContainer}>
              <div 
                style={{
                  ...styles.checkbox,
                  ...(rememberMe && styles.checkboxChecked)
                }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <label 
                style={styles.checkboxLabel}
                onClick={() => setRememberMe(!rememberMe)}
              >
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={styles.loadingSpinner} />
                <span style={styles.buttonText}>Signing in...</span>
              </>
            ) : (
              <>
                <span style={styles.buttonText}>Sign In</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Social Login */}
        <div style={styles.socialButtons}>
          <button type="button" style={styles.socialButton}>
            <span style={styles.socialIcon}>🔵</span>
            Google
          </button>
          <button type="button" style={styles.socialButton}>
            <span style={styles.socialIcon}>🔷</span>
            GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p style={styles.signupLink}>
          New to PrakritiPath?
          <Link to="/signup" style={styles.signupLinkAction}>
            Create an account
          </Link>
        </p>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;