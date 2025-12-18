import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({ general: error.message || "Signup failed. Please try again." });
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
        radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
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
      maxWidth: '500px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'slideIn 0.6s ease-out',
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
      display: 'block',
      fontSize: '14px',
      color: '#cbd5e1',
      fontWeight: '500',
      marginBottom: '8px',
      marginLeft: '4px',
    },
    inputContainer: {
      position: 'relative',
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
    inputError: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
    inputFocus: {
      ':focus': {
        borderColor: '#10b981',
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
      },
    },
    passwordToggle: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      color: '#cbd5e1',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        color: '#10b981',
      },
    },
    select: {
      width: '100%',
      padding: '20px 24px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '16px',
      color: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23cbd5e1' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 20px center',
      paddingRight: '50px',
      ':focus': {
        borderColor: '#10b981',
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
      },
    },
    selectOption: {
      background: '#1e293b',
      color: 'white',
    },
    errorText: {
      color: '#ef4444',
      fontSize: '13px',
      marginTop: '6px',
      marginLeft: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    roleCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '12px',
    },
    roleCard: {
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    roleCardSelected: {
      background: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10b981',
    },
    roleIcon: {
      fontSize: '32px',
      marginBottom: '12px',
    },
    roleTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '4px',
    },
    roleDescription: {
      fontSize: '12px',
      color: '#cbd5e1',
    },
    passwordStrength: {
      marginTop: '8px',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    strengthBar: {
      height: '100%',
      transition: 'all 0.3s ease',
      background: '#ef4444',
    },
    strengthText: {
      fontSize: '12px',
      color: '#cbd5e1',
      marginTop: '4px',
      textAlign: 'right',
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
      marginTop: '16px',
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
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTopColor: 'white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    terms: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '24px 0',
    },
    termsCheckbox: {
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
    termsCheckboxChecked: {
      background: '#10b981',
      borderColor: '#10b981',
    },
    termsText: {
      fontSize: '14px',
      color: '#cbd5e1',
      lineHeight: '1.5',
    },
    termsLink: {
      color: '#3b82f6',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    loginLink: {
      textAlign: 'center',
      fontSize: '15px',
      color: '#cbd5e1',
      marginTop: '32px',
    },
    loginLinkAction: {
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
    errorMessage: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      color: '#ef4444',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
  };

  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: '🎓',
      description: 'Learn and grow'
    },
    {
      id: 'teacher',
      label: 'Teacher',
      icon: '👨‍🏫',
      description: 'Guide and inspire'
    },
    {
      id: 'eco-warrior',
      label: 'Eco Warrior',
      icon: '🌍',
      description: 'Protect and serve'
    },
    {
      id: 'researcher',
      label: 'Researcher',
      icon: '🔬',
      description: 'Discover and innovate'
    }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    let color = '#ef4444';
    let text = 'Weak';
    if (strength >= 50 && strength < 75) {
      color = '#f59e0b';
      text = 'Fair';
    } else if (strength >= 75) {
      color = '#10b981';
      text = 'Strong';
    }
    
    return { strength, color, text };
  };

  const passwordStrength = calculatePasswordStrength(form.password);

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
          <h1 style={styles.title}>Start Your Eco-Journey</h1>
          <p style={styles.subtitle}>
            Join thousands making a difference. Track, learn, and grow sustainably.
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div style={styles.errorMessage}>
            <span>⚠️</span> {errors.general}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              style={{
                ...styles.input,
                ...styles.inputFocus,
                ...(errors.name && styles.inputError)
              }}
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <div style={styles.errorText}>⚠️ {errors.name}</div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              style={{
                ...styles.input,
                ...styles.inputFocus,
                ...(errors.email && styles.inputError)
              }}
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div style={styles.errorText}>⚠️ {errors.email}</div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <div style={styles.inputContainer}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                style={{
                  ...styles.input,
                  ...styles.inputFocus,
                  ...(errors.password && styles.inputError)
                }}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {form.password && (
              <>
                <div style={styles.passwordStrength}>
                  <div style={{
                    ...styles.strengthBar,
                    width: `${passwordStrength.strength}%`,
                    background: passwordStrength.color,
                  }} />
                </div>
                <div style={styles.strengthText}>
                  Strength: {passwordStrength.text}
                </div>
              </>
            )}
            {errors.password && (
              <div style={styles.errorText}>⚠️ {errors.password}</div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Confirm Password</label>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              style={{
                ...styles.input,
                ...styles.inputFocus,
                ...(errors.confirmPassword && styles.inputError)
              }}
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div style={styles.errorText}>⚠️ {errors.confirmPassword}</div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Select Your Role</label>
            <div style={styles.roleCards}>
              {roles.map(role => (
                <div
                  key={role.id}
                  style={{
                    ...styles.roleCard,
                    ...(form.role === role.id && styles.roleCardSelected)
                  }}
                  onClick={() => setForm({ ...form, role: role.id })}
                >
                  <div style={styles.roleIcon}>{role.icon}</div>
                  <div style={styles.roleTitle}>{role.label}</div>
                  <div style={styles.roleDescription}>{role.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.terms}>
            <div 
              style={{
                ...styles.termsCheckbox,
                ...styles.termsCheckboxChecked
              }}
            >
              ✓
            </div>
            <div style={styles.termsText}>
              I agree to the{' '}
              <a href="/terms" style={styles.termsLink}>Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" style={styles.termsLink}>Privacy Policy</a>
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={styles.loadingSpinner} />
                <span style={styles.buttonText}>Creating Account...</span>
              </>
            ) : (
              <>
                <span style={styles.buttonText}>Start Your Journey</span>
                <span>🚀</span>
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p style={styles.loginLink}>
          Already have an account?
          <Link to="/login" style={styles.loginLinkAction}>
            Sign In
          </Link>
        </p>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
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

export default Signup;