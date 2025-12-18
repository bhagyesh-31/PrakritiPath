import { Link } from "react-router-dom";

const Landing = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '28px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none',
    },
    navLinks: {
      display: 'flex',
      gap: '32px',
      alignItems: 'center',
    },
    navLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      padding: '8px 16px',
      borderRadius: '8px',
      ':hover': {
        color: '#ffffff',
        background: 'rgba(255, 255, 255, 0.1)',
      },
    },
    hero: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '60px',
      padding: '80px 0',
    },
    heroContent: {
      flex: 1,
      maxWidth: '600px',
    },
    heroTitle: {
      fontSize: '64px',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '24px',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '20px',
      lineHeight: '1.6',
      color: '#cbd5e1',
      marginBottom: '40px',
      maxWidth: '520px',
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    primaryButton: {
      padding: '18px 36px',
      fontSize: '18px',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4)',
      },
    },
    secondaryButton: {
      padding: '18px 36px',
      fontSize: '18px',
      fontWeight: '600',
      background: 'transparent',
      color: '#10b981',
      border: '2px solid #10b981',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      ':hover': {
        background: 'rgba(16, 185, 129, 0.1)',
        transform: 'translateY(-3px)',
      },
    },
    heroVisual: {
      flex: 1,
      position: 'relative',
      maxWidth: '500px',
    },
    floatingCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    floatingCard1: {
      transform: 'translateX(-20px)',
      animation: 'float 6s ease-in-out infinite',
    },
    floatingCard2: {
      position: 'absolute',
      top: '40px',
      right: '-40px',
      transform: 'translateX(20px)',
      animation: 'float 8s ease-in-out infinite 1s',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '16px',
    },
    cardContent: {
      color: '#cbd5e1',
      fontSize: '14px',
      lineHeight: '1.5',
    },
    stats: {
      display: 'flex',
      gap: '48px',
      marginTop: '60px',
      padding: '32px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    statItem: {
      textAlign: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px',
    },
    statLabel: {
      fontSize: '16px',
      color: '#cbd5e1',
      fontWeight: '500',
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      marginTop: '80px',
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-8px)',
        background: 'rgba(255, 255, 255, 0.1)',
      },
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '24px',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '16px',
    },
    featureDescription: {
      fontSize: '15px',
      color: '#cbd5e1',
      lineHeight: '1.6',
    },
    footer: {
      marginTop: '80px',
      padding: '40px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
    },
    footerText: {
      color: '#94a3b8',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <Link to="/" style={styles.logo}>
            <span style={{ fontSize: '32px' }}>🌱</span>
            PRAKRITIPATH
          </Link>
          <nav style={styles.navLinks}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#impact" style={styles.navLink}>Impact</a>
            <a href="#about" style={styles.navLink}>About</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Transform Your Habits,
              Transform Our Planet
            </h1>
            <p style={styles.heroSubtitle}>
              Join a community of eco-warriors tracking sustainable habits, 
              earning rewards, and creating real environmental impact. 
              Every small action adds up to massive change.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/signup" style={styles.primaryButton}>
                Start Your Journey
              </Link>
              <Link to="/login" style={styles.secondaryButton}>
                Already a Member?
              </Link>
            </div>
          </div>

          <div style={styles.heroVisual}>
            <div style={{...styles.floatingCard, ...styles.floatingCard1}}>
              <div style={styles.cardTitle}>🌿 Daily Eco-Challenges</div>
              <p style={styles.cardContent}>
                Complete sustainable tasks and earn XP while reducing your carbon footprint
              </p>
            </div>
            <div style={{...styles.floatingCard, ...styles.floatingCard2}}>
              <div style={styles.cardTitle}>🏆 Leaderboard</div>
              <p style={styles.cardContent}>
                Compete with friends and see your environmental impact grow
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>10K+</div>
            <div style={styles.statLabel}>Eco-Actions Completed</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>2.5K+</div>
            <div style={styles.statLabel}>Active Members</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>500+</div>
            <div style={styles.statLabel}>Trees Planted</div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" style={{ marginTop: '100px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '60px',
            color: 'white',
          }}>
            How It Works
          </h2>
          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🌱</div>
              <h3 style={styles.featureTitle}>Track & Learn</h3>
              <p style={styles.featureDescription}>
                Log your daily sustainable activities and learn about their environmental impact through detailed analytics.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏆</div>
              <h3 style={styles.featureTitle}>Earn & Compete</h3>
              <p style={styles.featureDescription}>
                Gain XP for eco-friendly habits, unlock achievements, and climb the global leaderboard.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🤝</div>
              <h3 style={styles.featureTitle}>Community Impact</h3>
              <p style={styles.featureDescription}>
                Join forces with other members to complete community challenges and create real-world environmental change.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            © 2024 PRAKRITIPATH. Making sustainability rewarding.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;