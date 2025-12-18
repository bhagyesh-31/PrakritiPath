import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("global");
  const [timeframe, setTimeframe] = useState("all-time");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - in real app this would come from API
  const mockLeaderboard = [
    { id: 1, name: "Eco Champion", avatar: "🌍", xp: 12589, streak: 45, role: "Eco Warrior", impact: 289, level: 42, isCurrentUser: false },
    { id: 2, name: "Green Guardian", avatar: "🌿", xp: 10842, streak: 38, role: "Teacher", impact: 254, level: 38, isCurrentUser: false },
    { id: 3, name: user?.name || "You", avatar: "🌟", xp: user?.xp || 9567, streak: user?.streak || 24, role: user?.role || "Student", impact: 218, level: 35, isCurrentUser: true },
    { id: 4, name: "Nature Nurturer", avatar: "🌱", xp: 8472, streak: 31, role: "Researcher", impact: 197, level: 32, isCurrentUser: false },
    { id: 5, name: "Planet Protector", avatar: "🪐", xp: 7891, streak: 28, role: "Eco Warrior", impact: 184, level: 30, isCurrentUser: false },
    { id: 6, name: "Sustainability Star", avatar: "⭐", xp: 6543, streak: 21, role: "Student", impact: 156, level: 27, isCurrentUser: false },
    { id: 7, name: "Climate Crusader", avatar: "⚡", xp: 5987, streak: 18, role: "Teacher", impact: 142, level: 25, isCurrentUser: false },
    { id: 8, name: "Eco Explorer", avatar: "🧭", xp: 5123, streak: 15, role: "Student", impact: 128, level: 22, isCurrentUser: false },
    { id: 9, name: "Green Guru", avatar: "🧘", xp: 4567, streak: 12, role: "Eco Warrior", impact: 112, level: 20, isCurrentUser: false },
    { id: 10, name: "Earth Enthusiast", avatar: "🌏", xp: 3985, streak: 9, role: "Researcher", impact: 98, level: 18, isCurrentUser: false },
  ];

  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboard);

  const filters = [
    { id: "global", label: "🌍 Global", icon: "🌍" },
    { id: "friends", label: "👥 Friends", icon: "👥" },
    { id: "school", label: "🏫 School", icon: "🏫" },
    { id: "role", label: "🎭 By Role", icon: "🎭" },
  ];

  const timeframes = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all-time", label: "All Time" },
  ];

  const getRankBadge = (index) => {
    if (index === 0) return { emoji: "👑", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" };
    if (index === 1) return { emoji: "🥈", color: "#94a3b8", bg: "rgba(148, 163, 184, 0.15)" };
    if (index === 2) return { emoji: "🥉", color: "#d97706", bg: "rgba(217, 119, 6, 0.15)" };
    return { emoji: `${index + 1}`, color: "#64748b", bg: "transparent" };
  };

  const getLevelColor = (level) => {
    if (level >= 40) return { color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)" };
    if (level >= 30) return { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" };
    if (level >= 20) return { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" };
    return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" };
  };

  const styles = {
    container: {
      width: '100%',
    },
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '800',
      color: 'white',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#cbd5e1',
    },
    filters: {
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '500',
      color: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '120px',
      justifyContent: 'center',
    },
    filterButtonActive: {
      background: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10b981',
      color: '#10b981',
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)',
    },
    timeframeTabs: {
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '4px',
      marginBottom: '32px',
      maxWidth: '400px',
    },
    timeframeTab: {
      flex: 1,
      padding: '10px 16px',
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    timeframeTabActive: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    searchBox: {
      position: 'relative',
      marginBottom: '32px',
    },
    searchInput: {
      width: '100%',
      padding: '16px 52px 16px 48px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '15px',
      color: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px',
      color: '#cbd5e1',
    },
    leaderboardTable: {
      width: '100%',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.03)',
    },
    tableHeader: {
      background: 'rgba(16, 185, 129, 0.1)',
      padding: '24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    tableTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '4px',
    },
    tableSubtitle: {
      fontSize: '14px',
      color: '#cbd5e1',
    },
    tableHeaderRow: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr 120px 120px 120px',
      padding: '20px 24px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    tableHeaderCell: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#cbd5e1',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr 120px 120px 120px',
      padding: '20px 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s ease',
      alignItems: 'center',
    },
    currentUserRow: {
      background: 'rgba(16, 185, 129, 0.1)',
      position: 'relative',
      ':before': {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '4px',
        background: 'linear-gradient(180deg, #10b981 0%, #3b82f6 100%)',
      },
    },
    rankCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    rankBadge: {
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '700',
    },
    rankText: {
      fontSize: '14px',
      color: '#94a3b8',
      fontWeight: '500',
    },
    userCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    userAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '600',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '4px',
    },
    userRole: {
      fontSize: '13px',
      color: '#94a3b8',
      fontWeight: '500',
    },
    userTag: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '10px',
      fontSize: '11px',
      fontWeight: '600',
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
      marginTop: '4px',
    },
    statCell: {
      fontSize: '16px',
      fontWeight: '700',
      color: 'white',
    },
    xpCell: {
      fontSize: '20px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    streakCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '16px',
      fontWeight: '700',
      color: '#f59e0b',
    },
    levelBadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block',
    },
    emptyState: {
      padding: '60px 40px',
      textAlign: 'center',
    },
    emptyStateIcon: {
      fontSize: '48px',
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
    footer: {
      marginTop: '32px',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userPosition: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    positionLabel: {
      fontSize: '14px',
      color: '#cbd5e1',
    },
    positionValue: {
      fontSize: '28px',
      fontWeight: '800',
      color: 'white',
    },
    motivationText: {
      fontSize: '16px',
      color: '#10b981',
      fontWeight: '600',
      textAlign: 'right',
    },
    filterIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#94a3b8',
      marginTop: '12px',
    },
  };

  // Filter leaderboard based on search term
  const filteredLeaderboard = leaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUserRank = filteredLeaderboard.findIndex(player => player.isCurrentUser) + 1;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          🏆 Leaderboard
        </h2>
        <p style={styles.subtitle}>
          Track your progress and compete with eco-warriors worldwide
        </p>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {filters.map(filter => (
          <button
            key={filter.id}
            style={{
              ...styles.filterButton,
              ...(activeFilter === filter.id && styles.filterButtonActive)
            }}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Timeframe Tabs */}
      <div style={styles.timeframeTabs}>
        {timeframes.map(timeframeItem => (
          <button
            key={timeframeItem.id}
            style={{
              ...styles.timeframeTab,
              ...(timeframe === timeframeItem.id && styles.timeframeTabActive)
            }}
            onClick={() => setTimeframe(timeframeItem.id)}
          >
            {timeframeItem.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={styles.searchBox}>
        <div style={styles.searchIcon}>🔍</div>
        <input
          type="text"
          placeholder="Search by name or role..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Leaderboard Table */}
      <div style={styles.leaderboardTable}>
        <div style={styles.tableHeader}>
          <div style={styles.tableTitle}>
            {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Rankings
          </div>
          <div style={styles.tableSubtitle}>
            {filteredLeaderboard.length} eco-warriors • Updated just now
          </div>
        </div>

        <div style={styles.tableHeaderRow}>
          <div style={styles.tableHeaderCell}>Rank</div>
          <div style={styles.tableHeaderCell}>Eco Warrior</div>
          <div style={styles.tableHeaderCell}>XP</div>
          <div style={styles.tableHeaderCell}>Streak</div>
          <div style={styles.tableHeaderCell}>Level</div>
        </div>

        {filteredLeaderboard.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>🔍</div>
            <p style={styles.emptyStateText}>No players found</p>
            <p style={styles.emptyStateSubtext}>
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          filteredLeaderboard.map((player, index) => {
            const rankBadge = getRankBadge(index);
            const levelColor = getLevelColor(player.level);
            
            return (
              <div
                key={player.id}
                style={{
                  ...styles.tableRow,
                  ...(player.isCurrentUser && styles.currentUserRow)
                }}
              >
                {/* Rank */}
                <div style={styles.rankCell}>
                  <div
                    style={{
                      ...styles.rankBadge,
                      background: rankBadge.bg,
                      color: rankBadge.color,
                    }}
                  >
                    {rankBadge.emoji}
                  </div>
                  <div style={styles.rankText}>
                    {index === 0 && 'Champion'}
                    {index === 1 && 'Runner-up'}
                    {index === 2 && '3rd Place'}
                    {index >= 3 && `Rank ${index + 1}`}
                  </div>
                </div>

                {/* User Info */}
                <div style={styles.userCell}>
                  <div style={{
                    ...styles.userAvatar,
                    background: player.isCurrentUser 
                      ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
                      : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  }}>
                    {player.avatar}
                  </div>
                  <div style={styles.userInfo}>
                    <div style={styles.userName}>
                      {player.name}
                      {player.isCurrentUser && <span style={{marginLeft: '8px', fontSize: '14px'}}>👤</span>}
                    </div>
                    <div style={styles.userRole}>
                      {player.role.charAt(0).toUpperCase() + player.role.slice(1)}
                    </div>
                    {player.isCurrentUser && (
                      <div style={styles.userTag}>You</div>
                    )}
                  </div>
                </div>

                {/* XP */}
                <div style={{...styles.statCell, ...styles.xpCell}}>
                  {player.xp.toLocaleString()} XP
                </div>

                {/* Streak */}
                <div style={styles.streakCell}>
                  🔥 {player.streak} days
                </div>

                {/* Level */}
                <div>
                  <div style={{
                    ...styles.levelBadge,
                    background: levelColor.bg,
                    color: levelColor.color,
                  }}>
                    Level {player.level}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer - Current User Position */}
      <div style={styles.footer}>
        <div style={styles.userPosition}>
          <div style={styles.positionLabel}>
            Your Current Position
          </div>
          <div style={styles.positionValue}>
            #{currentUserRank}
          </div>
          <div style={styles.filterIndicator}>
            🔍 Filtered by: {activeFilter} • {timeframe}
          </div>
        </div>
        <div style={styles.motivationText}>
          {currentUserRank <= 3 ? '🏆 You\'re in the top 3! Amazing work!' :
           currentUserRank <= 10 ? '⭐ You\'re in the top 10! Keep pushing!' :
           currentUserRank <= 50 ? '🚀 You\'re climbing fast! Almost there!' :
           '🌱 Every action counts! Keep going!'}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;