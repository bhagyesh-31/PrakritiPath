import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

const AddContribution = () => {
  const { user } = useAuth();
  const { addContribution } = useApp();
  const fileInputRef = useRef(null);
  
  const [form, setForm] = useState({
    category: "water",
    caption: "",
    media: null,
    mediaPreview: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categories = [
    { id: "water", label: "💧 Water", color: "#3b82f6" },
    { id: "energy", label: "⚡ Energy", color: "#f59e0b" },
    { id: "waste", label: "🗑️ Waste", color: "#10b981" },
    { id: "food", label: "🍎 Food", color: "#8b5cf6" },
    { id: "transport", label: "🚲 Transport", color: "#ec4899" },
    { id: "education", label: "📚 Education", color: "#6366f1" },
  ];

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        media: file,
        mediaPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setForm({
        ...form,
        media: file,
        mediaPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveMedia = () => {
    setForm({
      ...form,
      media: null,
      mediaPreview: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.caption.trim() || !form.media) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newContribution = {
      id: Date.now(),
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      userAvatar: user.avatar || user.name?.charAt(0)?.toUpperCase() || 'U',
      category: form.category,
      caption: form.caption,
      verified: true,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
      xpEarned: 25,
      impactScore: Math.floor(Math.random() * 20) + 10,
    };

    addContribution(newContribution);

    // Reset form
    setForm({
      category: "water",
      caption: "",
      media: null,
      mediaPreview: null,
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setIsSubmitting(false);
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
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: '16px',
      color: '#cbd5e1',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '12px',
    },
    categoryButton: {
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
      color: '#cbd5e1',
    },
    categoryButtonSelected: {
      background: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10b981',
      color: 'white',
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)',
    },
    categoryIcon: {
      fontSize: '24px',
    },
    categoryLabel: {
      fontSize: '14px',
      fontWeight: '600',
    },
    uploadArea: {
      position: 'relative',
      border: `2px dashed ${isDragging ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
      borderRadius: '20px',
      padding: '40px 20px',
      background: isDragging ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.03)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      cursor: 'pointer',
    },
    uploadContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    },
    uploadIcon: {
      fontSize: '48px',
      color: isDragging ? '#10b981' : '#cbd5e1',
      transition: 'all 0.3s ease',
    },
    uploadText: {
      fontSize: '16px',
      color: isDragging ? '#10b981' : '#cbd5e1',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    uploadSubtext: {
      fontSize: '14px',
      color: '#94a3b8',
    },
    mediaPreview: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '20px',
    },
    mediaImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '20px',
    },
    removeMediaButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ':hover': {
        background: 'rgba(239, 68, 68, 0.8)',
        transform: 'scale(1.1)',
      },
    },
    captionTextarea: {
      width: '100%',
      minHeight: '120px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '16px',
      color: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      resize: 'vertical',
      fontFamily: "'Inter', sans-serif",
    },
    captionTextareaFocus: {
      ':focus': {
        borderColor: '#10b981',
        boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
      },
    },
    hashtagSuggestion: {
      fontSize: '14px',
      color: '#94a3b8',
      marginTop: '8px',
    },
    xpReward: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '8px',
    },
    xpRewardText: {
      fontSize: '15px',
      color: '#10b981',
      fontWeight: '600',
    },
    xpRewardValue: {
      fontSize: '20px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    submitButton: {
      width: '100%',
      padding: '20px',
      background: isSubmitting 
        ? 'rgba(16, 185, 129, 0.7)' 
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '16px',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
      opacity: isSubmitting ? 0.8 : 1,
      ':hover': !isSubmitting && {
        transform: 'translateY(-3px)',
        boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4)',
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
    fileInput: {
      display: 'none',
    },
  };

  const hashtags = [
    '#SustainableLiving',
    '#ClimateAction',
    '#GoGreen',
    '#ZeroWaste',
    '#SaveWater',
    '#RenewableEnergy',
  ];

  const selectedCategory = categories.find(cat => cat.id === form.category);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Share Your Eco-Action</h2>
        <p style={styles.subtitle}>
          Document your sustainable habits and inspire others in the community
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Category Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            📊 Category
          </label>
          <div style={styles.categoriesGrid}>
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                style={{
                  ...styles.categoryButton,
                  ...(form.category === category.id && styles.categoryButtonSelected)
                }}
                onClick={() => setForm({ ...form, category: category.id })}
              >
                <span style={styles.categoryIcon}>{category.label.split(' ')[0]}</span>
                <span style={styles.categoryLabel}>{category.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            📸 Media Upload
          </label>
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,video/*"
            onChange={handleMediaChange}
            style={styles.fileInput}
          />
          
          {!form.mediaPreview ? (
            <div
              style={styles.uploadArea}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={styles.uploadContent}>
                <div style={styles.uploadIcon}>
                  {isDragging ? '📤' : '📁'}
                </div>
                <div style={styles.uploadText}>
                  {isDragging ? 'Drop your file here' : 'Click to upload or drag & drop'}
                </div>
                <div style={styles.uploadSubtext}>
                  Supports JPG, PNG, MP4 (Max 10MB)
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.mediaPreview}>
              <img 
                src={form.mediaPreview} 
                alt="Preview" 
                style={styles.mediaImage}
              />
              <button
                type="button"
                style={styles.removeMediaButton}
                onClick={handleRemoveMedia}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Caption */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            💭 Caption & Description
          </label>
          <textarea
            placeholder="Describe your sustainable action... 
What did you do? 
Why is it important? 
What impact does it have?

Add relevant hashtags to reach more people! #EcoFriendly #Sustainability"
            style={{...styles.captionTextarea, ...styles.captionTextareaFocus}}
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            required
          />
          <div style={styles.hashtagSuggestion}>
            Quick hashtags: {hashtags.join(' ')}
          </div>
        </div>

        {/* XP Reward */}
        <div style={styles.xpReward}>
          <div style={styles.xpRewardText}>
            Estimated XP Reward
          </div>
          <div style={styles.xpRewardValue}>
            +25 XP
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.submitButton}
          disabled={isSubmitting || !form.caption.trim() || !form.media}
        >
          {isSubmitting ? (
            <>
              <div style={styles.loadingSpinner} />
              Submitting...
            </>
          ) : (
            <>
              🌱 Share Your Action
              <span style={{ fontSize: '20px' }}>→</span>
            </>
          )}
        </button>
      </form>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AddContribution;