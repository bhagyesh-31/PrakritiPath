import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import ContributionCard from "../components/contribution/ContributionCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const { contributions } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  const userContributions = contributions.filter(
    (c) => c.userId === user.id
  );

  const totalImpact = userContributions.reduce((sum, c) => sum + (c.impactScore || 0), 0);
  const avgScore = userContributions.length > 0 
    ? Math.round(totalImpact / userContributions.length) 
    : 0;
  const rank = Math.floor(Math.random() * 50) + 1; // Mock rank for now

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
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      marginBottom: '48px',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      ':hover': {
        color: '#10b981',
      },
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '48px',
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: '600',
      color: 'white',
      border: '4px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: '48px',
      fontWeight: '800',
      color: 'white',
      marginBottom: '8px',
    },
    userEmail: {
      fontSize: '18px',
      color: '#cbd5e1',
      marginBottom: '16px',
    },
    userBadge: {
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#78350f',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    logoutButton: {
      padding: '14px 32px',
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: '2px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: 'rgba(239, 68, 68, 0.2)',
        transform: 'translateY(-2px)',
      },
    },
    tabs: {
      display: 'flex',
      gap: '4px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '4px',
      marginBottom: '48px',
      maxWidth: '600px',
    },
    tab: {
      flex: 1,
      padding: '16px 24px',
      background: 'transparent',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    activeTab: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      ':hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.08)',
      },
    },
    statIcon: {
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      fontSize: '100px',
      opacity: '0.05',
      color: '#10b981',
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
    statSubtext: {
      fontSize: '14px',
      color: '#94a3b8',
      marginTop: '8px',
    },
    section: {
      marginBottom: '60px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white',
      position: 'relative',
      display: 'inline-block',
    },
    sectionTitleUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '0',
      width: '60px',
      height: '4px',
      background: 'linear-gradient(90deg, #10b981, #3b82f6)',
      borderRadius: '2px',
    },
    viewAllButton: {
      padding: '12px 24px',
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      ':hover': {
        background: 'rgba(16, 185, 129, 0.2)',
      },
    },
    contributionsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 40px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: '1px dashed rgba(255, 255, 255, 0.1)',
    },
    emptyStateIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    emptyStateText: {
      fontSize: '18px',
      color: '#9ca3af',
      marginBottom: '12px',
    },
    emptyStateSubtext: {
      fontSize: '14px',
      color: '#6b7280',
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '20px',
    },
    achievementCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.08)',
      },
    },
    achievementIcon: {
      fontSize: '32px',
      marginBottom: '12px',
    },
    achievementTitle: {
      fontSize: '14px',
      color: 'white',
      fontWeight: '600',
      marginBottom: '4px',
    },
    achievementDesc: {
      fontSize: '12px',
      color: '#9ca3af',
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

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'contributions', label: '🌱 Contributions', icon: '🌱' },
    { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
  ];

  const achievements = [
    { icon: '🌿', title: 'First Step', desc: 'First contribution', earned: true },
    { icon: '🔥', title: 'Streak Master', desc: '7 day streak', earned: true },
    { icon: '💡', title: 'Bright Idea', desc: '10 smart tips', earned: userContributions.length >= 10 },
    { icon: '👑', title: 'Eco Leader', desc: 'Top 10 ranking', earned: rank <= 10 },
    { icon: '🌍', title: 'Global Impact', desc: '50 total impact', earned: totalImpact >= 50 },
    { icon: '🤝', title: 'Community Hero', desc: 'Help 5 others', earned: false },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <Link to="/dashboard" style={styles.backLink}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileInfo}>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
            <div style={styles.userDetails}>
              <h1 style={styles.userName}>
                {user.name || user.email.split('@')[0]}
              </h1>
              <p style={styles.userEmail}>{user.email}</p>
              <div style={styles.userBadge}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          </div>
          <button style={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id && styles.activeTab)
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚡</div>
            <div style={styles.statValue}>{user.xp}</div>
            <div style={styles.statLabel}>Total XP</div>
            <div style={styles.statSubtext}>
              Level {Math.floor(user.xp/100) + 1} • Top {Math.ceil(rank/100*100)}%
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔥</div>
            <div style={styles.statValue}>{user.streak}</div>
            <div style={styles.statLabel}>Day Streak</div>
            <div style={styles.statSubtext}>
              {user.streak >= 7 ? '🔥 Keep it burning!' : 'Keep going!'}
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div style={styles.statValue}>{userContributions.length}</div>
            <div style={styles.statLabel}>Contributions</div>
            <div style={styles.statSubtext}>
              Avg. score: {avgScore} • Total impact: {totalImpact}
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👑</div>
            <div style={styles.statValue}>#{rank}</div>
            <div style={styles.statLabel}>Global Rank</div>
            <div style={styles.statSubtext}>
              {rank <= 10 ? '🏆 Top Performer!' : 'Climbing up!'}
            </div>
          </div>
        </div>

        {/* Contributions Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Recent Contributions
              <div style={styles.sectionTitleUnderline}></div>
            </h2>
            <Link to="/dashboard" style={styles.viewAllButton}>
              View All →
            </Link>
          </div>
          
          {userContributions.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>📝</div>
              <p style={styles.emptyStateText}>No contributions yet</p>
              <p style={styles.emptyStateSubtext}>
                Start your eco-journey by sharing your first contribution!
              </p>
            </div>
          ) : (
            <div style={styles.contributionsGrid}>
              {userContributions.slice(0, 3).map((c) => (
                <ContributionCard key={c.id} data={c} />
              ))}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Achievements
              <div style={styles.sectionTitleUnderline}></div>
            </h2>
          </div>
          
          <div style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.achievementCard,
                  opacity: achievement.earned ? 1 : 0.5,
                }}
              >
                <div style={styles.achievementIcon}>{achievement.icon}</div>
                <h3 style={styles.achievementTitle}>{achievement.title}</h3>
                <p style={styles.achievementDesc}>{achievement.desc}</p>
                <div style={{
                  fontSize: '10px',
                  marginTop: '8px',
                  color: achievement.earned ? '#10b981' : '#9ca3af',
                  fontWeight: '600',
                }}>
                  {achievement.earned ? '✓ Earned' : '🔒 Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Profile;