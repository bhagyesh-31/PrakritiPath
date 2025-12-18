import { useState } from "react";
import Leaderboard from "../components/leaderboard/Leaderboard";

const LeaderboardPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      marginBottom: '60px',
      textAlign: 'center',
    },
    title: {
      fontSize: '64px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px',
      position: 'relative',
      display: 'inline-block',
    },
    titleIcon: {
      position: 'absolute',
      top: '-20px',
      right: '-50px',
      fontSize: '48px',
      transform: 'rotate(25deg)',
    },
    subtitle: {
      fontSize: '20px',
      color: '#cbd5e1',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.6',
    },
    filterSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '12px 28px',
      fontSize: '16px',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#cbd5e1',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: '120px',
    },
    filterButtonActive: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      borderColor: 'transparent',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
    },
    timeframeTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '60px',
      flexWrap: 'wrap',
    },
    timeframeTab: {
      padding: '10px 24px',
      fontSize: '15px',
      fontWeight: '500',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#cbd5e1',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    timeframeTabActive: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981',
      borderColor: 'rgba(16, 185, 129, 0.4)',
    },
    leaderboardContainer: {
      position: 'relative',
    },
    leaderboardCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      marginBottom: '60px',
    },
    leaderboardHeader: {
      padding: '40px',
      background: 'rgba(16, 185, 129, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    leaderboardTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px',
    },
    leaderboardDescription: {
      fontSize: '16px',
      color: '#cbd5e1',
    },
    statsOverview: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '60px',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.08)',
      },
    },
    statIcon: {
      fontSize: '32px',
      marginBottom: '20px',
    },
    statValue: {
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
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      marginLeft: '16px',
    },
    top3Badge: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#78350f',
    },
    top10Badge: {
      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      color: 'white',
    },
    newBadge: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
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
    backButton: {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      padding: '16px 24px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 100,
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(16, 185, 129, 0.6)',
      },
    },
  };

  const timeframes = ['Today', 'This Week', 'This Month', 'All Time'];
  const filters = [
    { id: 'all', label: '🌍 Global' },
    { id: 'friends', label: '👥 Friends' },
    { id: 'local', label: '📍 Local' },
    { id: 'teams', label: '🤝 Teams' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Global Leaderboard
            <span style={styles.titleIcon}>🏆</span>
          </h1>
          <p style={styles.subtitle}>
            Compete with eco-warriors worldwide. Earn XP through sustainable actions
            and climb your way to the top!
          </p>
          
          {/* Filter Buttons */}
          <div style={styles.filterSection}>
            {filters.map(filter => (
              <button
                key={filter.id}
                style={{
                  ...styles.filterButton,
                  ...(selectedFilter === filter.id && styles.filterButtonActive)
                }}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {/* Timeframe Tabs */}
          <div style={styles.timeframeTabs}>
            {timeframes.map(timeframe => (
              <button
                key={timeframe}
                style={{
                  ...styles.timeframeTab,
                  ...(timeframe === 'All Time' && styles.timeframeTabActive)
                }}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsOverview}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👑</div>
            <div style={styles.statValue}>12,589</div>
            <div style={styles.statLabel}>Top Eco-Score</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌱</div>
            <div style={styles.statValue}>45.2K</div>
            <div style={styles.statLabel}>Total Actions</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🤝</div>
            <div style={styles.statValue}>2,847</div>
            <div style={styles.statLabel}>Active Members</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📈</div>
            <div style={styles.statValue}>+12%</div>
            <div style={styles.statLabel}>Growth This Month</div>
          </div>
        </div>

        {/* Leaderboard Card */}
        <div style={styles.leaderboardContainer}>
          <div style={styles.leaderboardCard}>
            <div style={styles.leaderboardHeader}>
              <h2 style={styles.leaderboardTitle}>
                Top Eco-Champions 
                <span style={{...styles.badge, ...styles.top3Badge}}>🏆 Top 3</span>
                <span style={{...styles.badge, ...styles.top10Badge}}>⭐ Top 10</span>
                <span style={{...styles.badge, ...styles.newBadge}}>🆕 Rising</span>
              </h2>
              <p style={styles.leaderboardDescription}>
                Updated in real-time. Your current position: <strong style={{color: '#10b981'}}>#42</strong>
              </p>
            </div>
            <div style={{ padding: '20px' }}>
              <Leaderboard />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Leaderboard updates every hour. Keep up the great work for our planet! 🌍
          </p>
        </footer>
      </div>

      {/* Floating Back Button */}
      <button 
        style={styles.backButton}
        onClick={() => window.history.back()}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default LeaderboardPage;