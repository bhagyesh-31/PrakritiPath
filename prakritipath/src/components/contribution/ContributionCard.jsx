import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ContributionCard = ({ data }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(data.comments || []);
  const [likes, setLikes] = useState(data.likes || 0);

  const categoryColors = {
    water: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', icon: '💧' },
    energy: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', icon: '⚡' },
    waste: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', icon: '🗑️' },
    food: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', icon: '🍎' },
    transport: { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', icon: '🚲' },
    education: { bg: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', icon: '📚' },
    default: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b', icon: '🌱' },
  };

  const category = categoryColors[data.category] || categoryColors.default;

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: user.name || user.email.split('@')[0],
        text: newComment,
        time: 'Just now',
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const styles = {
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '28px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      marginBottom: '20px',
      ':hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    userName: {
      fontSize: '18px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '4px',
    },
    userRole: {
      fontSize: '13px',
      color: '#94a3b8',
      fontWeight: '500',
    },
    categoryBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      background: category.bg,
      color: category.color,
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    dateTime: {
      fontSize: '14px',
      color: '#94a3b8',
      fontWeight: '500',
    },
    caption: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#e2e8f0',
      marginBottom: '20px',
      whiteSpace: 'pre-wrap',
    },
    hashtags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '20px',
    },
    hashtag: {
      color: '#60a5fa',
      fontSize: '14px',
      fontWeight: '500',
      opacity: '0.8',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        opacity: '1',
      },
    },
    impactSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '16px',
      marginBottom: '20px',
    },
    impactStat: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
    },
    impactIcon: {
      fontSize: '20px',
    },
    impactLabel: {
      fontSize: '12px',
      color: '#94a3b8',
    },
    impactValue: {
      fontSize: '16px',
      fontWeight: '700',
      color: 'white',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    actionButtons: {
      display: 'flex',
      gap: '20px',
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'transparent',
      border: 'none',
      color: '#cbd5e1',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '8px 16px',
      borderRadius: '12px',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.05)',
      },
    },
    actionButtonActive: {
      color: '#10b981',
    },
    likeButton: {
      color: isLiked ? '#ef4444' : '#cbd5e1',
    },
    bookmarkButton: {
      color: isBookmarked ? '#f59e0b' : '#cbd5e1',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      marginTop: '12px',
    },
    commentsSection: {
      marginTop: '24px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    commentsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    commentsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
    },
    commentForm: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
    },
    commentInput: {
      flex: 1,
      padding: '12px 16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      fontSize: '14px',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease',
      ':focus': {
        borderColor: '#10b981',
      },
    },
    commentButton: {
      padding: '12px 20px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        opacity: '0.9',
      },
    },
    commentsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    commentItem: {
      display: 'flex',
      gap: '12px',
    },
    commentAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
    },
    commentUser: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
    },
    commentTime: {
      fontSize: '12px',
      color: '#94a3b8',
    },
    commentText: {
      fontSize: '14px',
      color: '#e2e8f0',
      lineHeight: '1.5',
    },
  };

  const extractHashtags = (text) => {
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const matches = text?.match(hashtagRegex) || [];
    return [...new Set(matches)];
  };

  const hashtags = extractHashtags(data.caption);

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {data.userAvatar || data.userName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>{data.userName}</div>
            <div style={styles.userRole}>
              {data.role ? `${data.role.charAt(0).toUpperCase() + data.role.slice(1)} • ` : ''}
              {formatDate(data.date)}
            </div>
          </div>
        </div>
        <div style={styles.categoryBadge}>
          {category.icon} {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
        </div>
      </div>

      {/* Caption */}
      <p style={styles.caption}>{data.caption}</p>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div style={styles.hashtags}>
          {hashtags.map((tag, index) => (
            <span key={index} style={styles.hashtag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Impact Stats */}
      <div style={styles.impactSection}>
        <div style={styles.impactStat}>
          <div style={styles.impactIcon}>🌍</div>
          <div style={styles.impactLabel}>Impact Score</div>
          <div style={styles.impactValue}>{data.impactScore || '--'}</div>
        </div>
        <div style={styles.impactStat}>
          <div style={styles.impactIcon}>⚡</div>
          <div style={styles.impactLabel}>XP Earned</div>
          <div style={styles.impactValue}>+{data.xpEarned || 10}</div>
        </div>
        {data.verified && (
          <div style={styles.verifiedBadge}>
            ✓ Community Verified
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <div style={styles.actionButtons}>
          <button 
            style={{
              ...styles.actionButton,
              ...(isLiked && styles.actionButtonActive),
              ...styles.likeButton
            }}
            onClick={handleLike}
          >
            {isLiked ? '❤️' : '🤍'} {likes > 0 ? likes : 'Like'}
          </button>
          <button 
            style={{
              ...styles.actionButton,
              ...(showComments && styles.actionButtonActive)
            }}
            onClick={() => setShowComments(!showComments)}
          >
            💬 {comments.length > 0 ? comments.length : 'Comment'}
          </button>
          <button 
            style={{
              ...styles.actionButton,
              ...(isBookmarked && styles.actionButtonActive),
              ...styles.bookmarkButton
            }}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? '🔖' : '📑'} Save
          </button>
        </div>
        <div style={styles.dateTime}>
          {formatDate(data.date)}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={styles.commentsSection}>
          <div style={styles.commentsHeader}>
            <div style={styles.commentsTitle}>
              Comments ({comments.length})
            </div>
          </div>
          
          <form onSubmit={handleAddComment} style={styles.commentForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              style={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" style={styles.commentButton}>
              Post
            </button>
          </form>

          {comments.length > 0 && (
            <div style={styles.commentsList}>
              {comments.map((comment) => (
                <div key={comment.id} style={styles.commentItem}>
                  <div style={styles.commentAvatar}>
                    {comment.user?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div style={styles.commentContent}>
                    <div style={styles.commentHeader}>
                      <span style={styles.commentUser}>{comment.user}</span>
                      <span style={styles.commentTime}>{comment.time}</span>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContributionCard;