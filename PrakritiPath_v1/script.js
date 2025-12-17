// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh4Qw8MgZfZ0wQxdkdFWieof5yYUwfn_g",
  authDomain: "prakritipath-3105.firebaseapp.com",
  projectId: "prakritipath-3105",
  storageBucket: "prakritipath-3105.firebasestorage.app",
  messagingSenderId: "887595422518",
  appId: "1:887595422518:web:812a1e60671a75ecb15997",
  measurementId: "G-8EB7K51J62"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Global state
let currentUser = null;
let currentUserData = null;
let selectedFile = null;
let selectedRole = '';

// ==================== AUTHENTICATION ==================== //

function signup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('selectedRole').value;
  const errorDiv = document.getElementById('signupError');

  if (!name || !email || !password || !confirmPassword || !role) {
    errorDiv.textContent = 'All fields are required';
    errorDiv.classList.remove('hidden');
    return;
  }

  if (password !== confirmPassword) {
    errorDiv.textContent = 'Passwords do not match';
    errorDiv.classList.remove('hidden');
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = 'Password must be at least 6 characters';
    errorDiv.classList.remove('hidden');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: email,
        role: role,
        xp: 0,
        streak: 0,
        level: 1,
        contributions: 0,
        certificates: 0,
        badges: [],
        createdAt: new Date(),
        lastActivityDate: new Date().toLocaleDateString()
      });
    })
    .then(() => {
      currentUser = auth.currentUser;
      loadUserData();
      showPage('dashboard');
      updateNavbar();
    })
    .catch(error => {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    });
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');

  if (!email || !password) {
    errorDiv.textContent = 'Email and password are required';
    errorDiv.classList.remove('hidden');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      currentUser = userCredential.user;
      loadUserData();
      showPage('dashboard');
      updateNavbar();
    })
    .catch(error => {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    });
}

function logout() {
  auth.signOut().then(() => {
    currentUser = null;
    currentUserData = null;
    showPage('landing');
    document.getElementById('navbar').classList.add('hidden');
  });
}

function selectRole(role) {
  selectedRole = role;
  document.getElementById('selectedRole').value = role;
  document.querySelectorAll('.role-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  event.target.closest('.role-option').classList.add('selected');
}

function showLoginForm() {
  // Clear login form fields
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('loginError').classList.add('hidden');
  
  // Clear signup form fields
  document.getElementById('signupName').value = '';
  document.getElementById('signupEmail').value = '';
  document.getElementById('signupPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  document.getElementById('selectedRole').value = '';
  document.getElementById('signupError').classList.add('hidden');
  
  showPage('loginForm');
}

// ==================== USER DATA ==================== //

function loadUserData() {
  if (!currentUser) return;

  db.collection('users').doc(currentUser.uid).get().then(doc => {
    if (doc.exists) {
      currentUserData = doc.data();
      updateDashboard();
      loadMyContributions();
      updateProfile();
      
      // Load admin data if teacher
      if (currentUserData.role === 'teacher') {
        document.getElementById('adminLink').classList.remove('hidden');
        loadAdminData();
      }
    }
  });
}

function updateDashboard() {
  if (!currentUserData) return;

  document.getElementById('userName').textContent = currentUserData.name.split(' ')[0];
  document.getElementById('streakValue').textContent = currentUserData.streak || 0;
  document.getElementById('xpValue').textContent = currentUserData.xp || 0;
  document.getElementById('levelValue').textContent = currentUserData.level || 1;
  document.getElementById('contributionValue').textContent = currentUserData.contributions || 0;

  // Update certificate progress - keep cycling after 7
  const progressCount = (currentUserData.contributions || 0) % 7;
  const progress = (progressCount / 7) * 100;
  document.getElementById('certificateProgress').style.width = progress + '%';
  document.getElementById('certificateProgress').textContent = `${progressCount}/7`;
  
  // Show reset message if contributed 7+ times
  const certResetMessage = document.getElementById('certResetMessage');
  if ((currentUserData.contributions || 0) >= 7) {
    certResetMessage.style.display = 'block';
    document.getElementById('certProgressText').textContent = '🔄 Complete 7 more contributions to earn your next certificate!';
  } else {
    certResetMessage.style.display = 'none';
    document.getElementById('certProgressText').textContent = 'Complete 7 contributions to earn your digital certificate!';
  }
}

function updateProfile() {
  if (!currentUserData) return;

  document.getElementById('profileName').textContent = currentUserData.name;
  document.getElementById('profileRole').textContent = currentUserData.role.replace('-', ' ');
  document.getElementById('profileContributions').textContent = currentUserData.contributions || 0;
  document.getElementById('profileXP').textContent = currentUserData.xp || 0;
  document.getElementById('profileCertificates').textContent = currentUserData.certificates || 0;

  // Set avatar emoji based on role
  const avatars = {
    'high-school': '🎓',
    'college': '🏫',
    'teacher': '👨‍🏫'
  };
  document.getElementById('profileAvatar').textContent = avatars[currentUserData.role] || '👤';

  // Load badges and certificates
  loadBadges();
  loadCertificates();

  // NEW: load this user's own posts into profile
  loadProfileMyPosts();
}

// ==================== CONTRIBUTIONS ==================== //

function validateDriveLink(link) {
  // Check if it's a valid Google Drive link
  return link.includes('drive.google.com') || link.includes('docs.google.com') || link.trim() === '';
}

function getImageFromDriveLink(link) {
  // Convert Google Drive sharing link to direct image view
  if (!link.trim()) return '';
  
  // Extract file ID from various Google Drive link formats
  let fileId = '';
  
  if (link.includes('/d/')) {
    fileId = link.split('/d/')[1].split('/')[0];
  } else if (link.includes('id=')) {
    fileId = link.split('id=')[1].split('&')[0];
  }
  
  if (fileId) {
    // Direct image view URL pattern for Google Drive [web:36][web:48]
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return link;
}

function submitContribution() {
  const actionType = document.getElementById('actionType').value;
  const caption = document.getElementById('caption').value;
  const hashtags = document.getElementById('hashtags').value;
  const photoLink = document.getElementById('photoLink').value;
  const errorDiv = document.getElementById('contributionError');
  const successDiv = document.getElementById('contributionSuccess');
  const submitBtn = document.getElementById('submitBtn');

  // Hide previous messages
  errorDiv.classList.add('hidden');
  successDiv.classList.add('hidden');

  // Validation
  if (!actionType || !caption.trim()) {
    errorDiv.textContent = '⚠️ Please select an action type and add a caption';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Validate Drive link if provided
  if (photoLink.trim() && !validateDriveLink(photoLink)) {
    errorDiv.textContent = '❌ Please enter a valid Google Drive or document link';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Disable submit button to prevent duplicate submissions
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  // Convert Drive link to viewable format
  const fileURL = getImageFromDriveLink(photoLink);
  saveContribution(actionType, caption, hashtags, fileURL);
}

function saveContribution(actionType, caption, hashtags, fileURL) {
  const submitBtn = document.getElementById('submitBtn');
  const successDiv = document.getElementById('contributionSuccess');
  const errorDiv = document.getElementById('contributionError');

  db.collection('contributions').add({
    userId: currentUser.uid,
    userName: currentUserData.name,
    userRole: currentUserData.role,
    actionType: actionType,
    caption: caption,
    hashtags: hashtags,
    imageUrl: fileURL,
    xpEarned: 25,
    verified: false,
    createdAt: new Date(),
    timestamp: new Date().getTime()
  }).then(() => {
    // Update user stats
    const newXP = (currentUserData.xp || 0) + 25;
    const newContributions = (currentUserData.contributions || 0) + 1;
    const newLevel = Math.floor(newXP / 100) + 1;

    db.collection('users').doc(currentUser.uid).update({
      xp: newXP,
      contributions: newContributions,
      level: newLevel,
      streak: getStreakDays(),
      lastActivityDate: new Date().toLocaleDateString()
    }).then(() => {
      currentUserData.xp = newXP;
      currentUserData.contributions = newContributions;
      currentUserData.level = newLevel;

      // Show success message
      successDiv.textContent = '✅ Contribution submitted successfully! +25 XP earned!';
      successDiv.classList.remove('hidden');

      // Reset form
      document.getElementById('actionType').value = '';
      document.getElementById('caption').value = '';
      document.getElementById('hashtags').value = '';
      document.getElementById('fileName').textContent = 'No file selected';
      selectedFile = null;

      updateDashboard();
      loadMyContributions();
      updateProfile();

      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Contribution';

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        showPage('dashboard');
      }, 2000);
    });
  }).catch(error => {
    errorDiv.textContent = '❌ Error saving contribution: ' + error.message;
    errorDiv.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Contribution';
  });
}

function loadMyContributions() {
  db.collection('contributions')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      const container = document.getElementById('myContributions');
      container.innerHTML = '';

      if (snapshot.empty) {
        container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">No contributions yet. Start your journey!</p>';
        return;
      }

      snapshot.forEach(doc => {
        const contrib = doc.data();
        const date = contrib.createdAt.toDate().toLocaleDateString();

        const card = document.createElement('div');
        card.className = 'contribution-card card';
        card.innerHTML = `
          <div class="contribution-image" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)); border-bottom: 2px solid var(--border);">
            ${contrib.imageUrl
              ? `<a href="${contrib.imageUrl}" target="_blank" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                   <img src="${contrib.imageUrl}" style="width: 100%; height: 100%; object-fit: cover; display: block;"
                        onerror="this.parentElement.innerHTML='<div style=&quot;display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-muted); font-size: 1.5rem;&quot;>📸 View on Drive</div>'">
                 </a>`
              : '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 2rem;">📸</div>'
            }
          </div>
          <div class="contribution-content">
            <div class="contribution-type">${contrib.actionType}</div>
            <p class="contribution-caption">${contrib.caption}</p>
            <div class="contribution-hashtags">${contrib.hashtags}</div>
            <div class="contribution-date">${date}</div>
            <div style="margin-top: 10px;">
              <span style="background: rgba(16, 185, 129, 0.2); color: var(--primary-green); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">+25 XP</span>
              <span style="background: ${contrib.verified ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${contrib.verified ? 'var(--success-green)' : 'var(--warning-yellow)'}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin-left: 5px;">
                ${contrib.verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    });
}

// NEW: show same user's posts inside their Profile page
function loadProfileMyPosts() {
  if (!currentUser) return;

  db.collection('contributions')
    .where('userId', '==', currentUser.uid)
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      const container = document.getElementById('profileMyPosts');
      if (!container) return;

      container.innerHTML = '';

      if (snapshot.empty) {
        container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">No posts yet. Start your journey!</p>';
        return;
      }

      snapshot.forEach(doc => {
        const contrib = doc.data();
        const date = contrib.createdAt.toDate().toLocaleDateString();

        const card = document.createElement('div');
        card.className = 'contribution-card card';
        card.innerHTML = `
          <div class="contribution-image" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)); border-bottom: 2px solid var(--border);">
            ${contrib.imageUrl
              ? `<a href="${contrib.imageUrl}" target="_blank" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-decoration: none;">
                   <img src="${contrib.imageUrl}" style="width: 100%; height: 100%; object-fit: cover; display: block;"
                        onerror="this.parentElement.innerHTML='<div style=&quot;display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-muted); font-size: 1.5rem;&quot;>📸 View on Drive</div>'">
                 </a>`
              : '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 2rem;">📸</div>'
            }
          </div>
          <div class="contribution-content">
            <div class="contribution-type">${contrib.actionType}</div>
            <p class="contribution-caption">${contrib.caption}</p>
            <div class="contribution-hashtags">${contrib.hashtags}</div>
            <div class="contribution-date">${date}</div>
            <div style="margin-top: 10px;">
              <span style="background: rgba(16, 185, 129, 0.2); color: var(--primary-green); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">+25 XP</span>
              <span style="background: ${contrib.verified ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${contrib.verified ? 'var(--success-green)' : 'var(--warning-yellow)'}; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin-left: 5px;">
                ${contrib.verified ? '✅ Verified' : '⏳ Pending'}
              </span>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    });
}

// ==================== LEADERBOARD ==================== //

function switchLeaderboardTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  loadLeaderboard(tab);
}

function loadLeaderboard(type = 'school') {
  db.collection('users')
    .orderBy('xp', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      const container = document.getElementById('leaderboardList');
      container.innerHTML = '';

      let rank = 1;
      snapshot.forEach(doc => {
        const user = doc.data();
        const li = document.createElement('li');
        li.className = `leaderboard-item rank-${rank}`;
        li.innerHTML = `
          <div class="rank-badge">${rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}</div>
          <div class="leaderboard-info">
            <div class="leaderboard-name">${user.name}</div>
            <div class="leaderboard-location">${user.role.replace('-', ' ')}</div>
          </div>
          <div class="leaderboard-xp">${user.xp || 0} XP</div>
        `;
        container.appendChild(li);
        rank++;
      });
    });
}

// ==================== BADGES ==================== //

function loadBadges() {
  const badges = [
    { icon: '🌟', name: 'First Step', unlocked: (currentUserData.contributions || 0) >= 1 },
    { icon: '🔥', name: 'On Fire', unlocked: (currentUserData.streak || 0) >= 7 },
    { icon: '♻️', name: 'Eco Warrior', unlocked: (currentUserData.contributions || 0) >= 10 },
    { icon: '🌍', name: 'Global Impact', unlocked: (currentUserData.xp || 0) >= 500 },
    { icon: '🏆', name: 'Top Contributor', unlocked: (currentUserData.xp || 0) >= 1000 },
    { icon: '🎖️', name: 'Leader', unlocked: (currentUserData.level || 1) >= 10 }
  ];

  const container = document.getElementById('badgesGrid');
  container.innerHTML = '';

  badges.forEach(badge => {
    const badgeDiv = document.createElement('div');
    badgeDiv.className = 'badge';
    badgeDiv.style.opacity = badge.unlocked ? '1' : '0.5';
    badgeDiv.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-name">${badge.name}</div>
      ${!badge.unlocked ? '<p style="font-size: 0.8rem; color: var(--text-muted);">Locked</p>' : ''}
    `;
    container.appendChild(badgeDiv);
  });
}

// ==================== CERTIFICATES ==================== //

function loadCertificates() {
  const container = document.getElementById('certificatesSection');

  if ((currentUserData.contributions || 0) < 7) {
    container.innerHTML = `<p style="color: var(--text-muted);">Complete ${7 - (currentUserData.contributions || 0)} more contributions to earn your certificate!</p>`;
    return;
  }

  const certDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const qrCode = `${currentUser.uid}`;

  container.innerHTML = `
    <div class="certificate-container">
      <div class="certificate-header">Certificate of Achievement</div>
      <p style="font-size: 1.1rem; margin: 20px 0;">This is to certify that</p>
      <div class="certificate-name">${currentUserData.name}</div>
      <p class="certificate-text">Has successfully completed 7 verified contributions towards United Nations Sustainable Development Goals</p>
      <p style="font-size: 1rem; margin: 20px 0;">Eco-Warrior Level: ${currentUserData.level || 1}</p>
      <p style="margin: 20px 0;">Total XP Earned: ${currentUserData.xp || 0}</p>
      <div class="certificate-qr">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://prakritipath.com/verify/' + currentUser.uid)}" alt="QR Code">
      </div>
      <div class="certificate-footer">
        <p>Issued on: ${certDate}</p>
        <p>Verification ID: ${qrCode.substring(0, 8).toUpperCase()}</p>
        <button class="btn btn-primary" style="margin-top: 20px;" onclick="downloadCertificate()">Download Certificate</button>
      </div>
    </div>
  `;
}

function downloadCertificate() {
  alert('📥 Certificate download feature coming soon!');
}

// ==================== ADMIN ==================== //

function loadAdminData() {
  // Load total users
  db.collection('users').get().then(snapshot => {
    document.getElementById('totalUsers').textContent = snapshot.size;

    let activeUsers = 0;
    const today = new Date().toLocaleDateString();

    snapshot.forEach(doc => {
      const user = doc.data();
      if (user.lastActivityDate === today) activeUsers++;
    });

    document.getElementById('activeUsers').textContent = activeUsers;
  });

  // Load contributions
  db.collection('contributions').get().then(snapshot => {
    document.getElementById('totalContributions').textContent = snapshot.size;

    let verified = 0;
    snapshot.forEach(doc => {
      if (doc.data().verified) verified++;
    });

    document.getElementById('totalCertificates').textContent = verified;
  });

  // Load users table
  db.collection('users').limit(10).get().then(snapshot => {
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = '';

    snapshot.forEach(doc => {
      const user = doc.data();
      const row = `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role.replace('-', ' ')}</td>
          <td>${user.contributions || 0}</td>
          <td><span class="status-badge status-active">Active</span></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  });

  // Load contributions table
  db.collection('contributions').orderBy('createdAt', 'desc').limit(10).get().then(snapshot => {
    const tbody = document.getElementById('contributionsTable');
    tbody.innerHTML = '';

    snapshot.forEach(doc => {
      const contrib = doc.data();
      const date = contrib.createdAt.toDate().toLocaleDateString();
      const row = `
        <tr>
          <td>${contrib.userName}</td>
          <td>${contrib.actionType}</td>
          <td>${date}</td>
          <td><span class="status-badge ${contrib.verified ? 'status-active' : 'status-inactive'}">${contrib.verified ? 'Verified' : 'Pending'}</span></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  });
}

// ==================== USER SEARCH ==================== //

function searchUsers(query) {
  if (!query.trim()) {
    document.getElementById('searchResults').innerHTML = '<p style="color: var(--text-muted);">Start typing to search for users...</p>';
    return;
  }

  const lowerQuery = query.toLowerCase();
  db.collection('users').get().then(snapshot => {
    const results = [];
    snapshot.forEach(doc => {
      const user = doc.data();
      if (user.name.toLowerCase().includes(lowerQuery)) {
        results.push({id: doc.id, ...user});
      }
    });

    const container = document.getElementById('searchResults');
    if (results.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted);">No users found</p>';
      return;
    }

    container.innerHTML = '';
    results.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'card';
      userCard.style.marginBottom = '15px';
      userCard.style.cursor = 'pointer';
      userCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 3rem; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-green), var(--accent-blue)); display: flex; align-items: center; justify-content: center;">
            ${user.profileEmoji || '👤'}
          </div>
          <div style="flex: 1;">
            <h3 style="color: var(--text-light); margin-bottom: 5px;">${user.name}</h3>
            <p style="color: var(--text-muted); margin-bottom: 5px;">${user.role.replace('-', ' ')}</p>
            <p style="color: var(--accent-blue);">🏆 ${user.xp || 0} XP · 📸 ${user.contributions || 0} Contributions</p>
          </div>
        </div>
      `;
      userCard.onclick = () => viewUserProfile(user.id);
      container.appendChild(userCard);
    });
  });
}

function viewUserProfile(userId) {
  db.collection('users').doc(userId).get().then(doc => {
    const user = doc.data();
    
    const avatars = {
      'high-school': '🎓',
      'college': '🏫',
      'teacher': '👨‍🏫'
    };

    document.getElementById('viewProfileAvatar').innerHTML = user.profileEmoji || avatars[user.role] || '👤';
    document.getElementById('viewProfileName').textContent = user.name;
    document.getElementById('viewProfileRole').textContent = user.role.replace('-', ' ');
    document.getElementById('viewProfileContributions').textContent = user.contributions || 0;
    document.getElementById('viewProfileXP').textContent = user.xp || 0;

    // Load user's posts
    db.collection('contributions')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get()
      .then(snapshot => {
        const container = document.getElementById('viewProfilePosts');
        container.innerHTML = '';

        if (snapshot.empty) {
          container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1;">No posts yet</p>';
          return;
        }

        snapshot.forEach(doc => {
          const contrib = doc.data();
          const date = contrib.createdAt.toDate().toLocaleDateString();
          const postId = doc.id;

          const card = document.createElement('div');
          card.className = 'contribution-card card';
          card.innerHTML = `
            <div class="contribution-image" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)); border-bottom: 2px solid var(--border);">
              ${contrib.imageUrl
                ? `<img src="${contrib.imageUrl}" style="width: 100%; height: 100%; object-fit: cover; display: block;"
                         onerror="this.parentElement.innerHTML='<div style=&quot;display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-muted);&quot;>📸 View on Drive</div>'">`
                : '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 2rem;">📸</div>'
              }
            </div>
            <div class="contribution-content">
              <div class="contribution-type">${contrib.actionType}</div>
              <p class="contribution-caption">${contrib.caption}</p>
              <div class="contribution-hashtags">${contrib.hashtags}</div>
              <div class="contribution-date">${date}</div>
              <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.9rem;" id="like-${postId}" onclick="toggleLike('${postId}')">❤️ Like</button>
                <button class="btn btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.9rem;" onclick="showComments('${postId}')">💬 Comment</button>
              </div>
              <div id="likeCount-${postId}" style="margin-top: 8px; color: var(--text-muted); font-size: 0.85rem;">0 likes</div>
              <div id="commentCount-${postId}" style="color: var(--text-muted); font-size: 0.85rem;">0 comments</div>
            </div>
          `;
          container.appendChild(card);
          updateLikeStatus(postId);
        });
      });

    showPage('userProfile');
  });
}
// ==================== SOCIAL FEED ==================== //

function loadSocialFeed() {
  db.collection('contributions')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get()
    .then(snapshot => {
      const container = document.getElementById('socialFeed');
      container.innerHTML = '';

      if (snapshot.empty) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No posts yet</p>';
        return;
      }

      snapshot.forEach(doc => {
        const contrib = doc.data();
        const date = contrib.createdAt.toDate().toLocaleDateString();
        const postId = doc.id;

        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '25px';
        card.innerHTML = `
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; cursor: pointer;" onclick="searchUsers('${contrib.userName}')">
            <div style="font-size: 2.5rem; width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-green), var(--accent-blue)); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              👤
            </div>
            <div>
              <h4 style="color: var(--text-light); margin: 0;">${contrib.userName}</h4>
              <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">${contrib.userRole.replace('-', ' ')} · ${date}</p>
            </div>
          </div>

          <div class="contribution-type" style="margin-bottom: 10px;">${contrib.actionType}</div>
          
          ${contrib.imageUrl ? `
            <div style="
              background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
              border-radius: 12px;
              overflow: hidden;
              margin-bottom: 15px;
              border: 1px solid var(--border);
              box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
              height: 300px;
            ">
              <img
                src="${contrib.imageUrl}"
                style="width: 100%; height: 100%; object-fit: cover; display: block;"
              >
            </div>
          ` : ''}

          <p class="contribution-caption">${contrib.caption}</p>
          <div class="contribution-hashtags">${contrib.hashtags}</div>

          <div style="display: flex; gap: 10px; margin-top: 15px; border-top: 1px solid var(--border); padding-top: 15px;">
            <button class="btn btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.9rem;" id="like-${postId}" onclick="toggleLike('${postId}')">❤️ Like</button>
            <button class="btn btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.9rem;" onclick="showComments('${postId}')">💬 Comment</button>
          </div>

          <div id="likeCount-${postId}" style="margin-top: 10px; color: var(--text-muted); font-size: 0.85rem;">0 likes</div>
          <div id="comments-${postId}" style="margin-top: 10px;"></div>
        `;
        container.appendChild(card);
        updateLikeStatus(postId);
        loadComments(postId);
      });
    });
}

// ==================== LIKES & COMMENTS ==================== //

function toggleLike(postId) {
  if (!currentUser) {
    alert('Please login to like posts');
    return;
  }

  const likeRef = db.collection('likes').doc(postId + '_' + currentUser.uid);
  
  likeRef.get().then(doc => {
    if (doc.exists) {
      // Unlike
      likeRef.delete().then(() => updateLikeStatus(postId));
    } else {
      // Like
      likeRef.set({
        userId: currentUser.uid,
        postId: postId,
        userName: currentUserData.name,
        createdAt: new Date()
      }).then(() => updateLikeStatus(postId));
    }
  });
}

function updateLikeStatus(postId) {
  db.collection('likes').where('postId', '==', postId).get().then(snapshot => {
    const likeCount = snapshot.size;
    const likeCountEl = document.getElementById('likeCount-' + postId);
    if (likeCountEl) {
      likeCountEl.textContent = likeCount + (likeCount === 1 ? ' like' : ' likes');
    }

    if (currentUser) {
      const likeRef = db.collection('likes').doc(postId + '_' + currentUser.uid);
      likeRef.get().then(doc => {
        const btn = document.getElementById('like-' + postId);
        if (btn) {
          btn.style.background = doc.exists ? 'rgba(239, 68, 68, 0.2)' : 'transparent';
          btn.style.color = doc.exists ? 'var(--danger-red)' : 'var(--primary-green)';
          btn.textContent = doc.exists ? '❤️ Liked' : '❤️ Like';
        }
      });
    }
  });
}

function showComments(postId) {
  const container = document.getElementById('comments-' + postId);
  if (!container) {
    console.error('comments container not found for', postId);
    return;
  }
  
  container.classList.add('comments-open');
  
  db.collection('comments')
    .where('postId', '==', postId)
    .orderBy('createdAt', 'asc')
    .get()
    .then(snapshot => {
      let html = '<div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid var(--border); background: rgba(16, 185, 129, 0.05); border-radius: 12px; padding: 15px;">';
      
      if (snapshot.empty) {
        html += '<p style="color: var(--text-muted); text-align: center; font-size: 0.9rem;">No comments yet. Be the first to comment! 💬</p>';
      } else {
        html += '<div style="margin-bottom: 15px; max-height: 200px; overflow-y: auto;">';
        snapshot.forEach(doc => {
          const comment = doc.data();
          const commentDate = new Date(comment.createdAt.toDate()).toLocaleString();
          html += `
            <div style="background: var(--card-bg); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid var(--primary-green);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                <strong style="color: var(--primary-green); font-size: 0.95rem;">${comment.userName}</strong>
                <span style="color: var(--text-muted); font-size: 0.75rem;">📅 ${commentDate}</span>
              </div>
              <p style="color: var(--text-light); margin: 0; font-size: 0.9rem; line-height: 1.4;">${comment.text}</p>
            </div>
          `;
        });
        html += '</div>';
      }

      html += `
        <div style="margin-top: 12px; display: flex; gap: 8px;">
          <input type="text" placeholder="Share your thoughts..." id="commentInput-${postId}" style="margin-bottom: 0; flex: 1;">
          <button class="btn btn-primary" style="padding: 8px 16px; white-space: nowrap;" onclick="addCommentHandler('${postId}')">💬 Post</button>
        </div>
      </div>`;
      
      container.innerHTML = html;
    });
}

function addCommentHandler(postId) {
  const inputElement = document.getElementById('commentInput-' + postId);
  
  if (!inputElement) {
    console.error('Comment input not found for postId:', postId);
    return;
  }

  const text = inputElement.value.trim();
  
  if (!text) {
    alert('Please enter a comment');
    return;
  }

  if (!currentUser) {
    alert('Please login to comment');
    return;
  }

  db.collection('comments').add({
    postId: postId,
    userId: currentUser.uid,
    userName: currentUserData.name,
    text: text,
    createdAt: new Date()
  }).then(() => {
    inputElement.value = '';
    setTimeout(() => {
      showComments(postId);
    }, 300);
  }).catch(error => {
    alert('Error posting comment: ' + error.message);
    console.error('Comment error:', error);
  });
}

function loadComments(postId) {
  db.collection('comments').where('postId', '==', postId).get().then(snapshot => {
    const commentCount = snapshot.size;
    const countEl = document.getElementById('commentCount-' + postId);
    if (countEl) {
      countEl.textContent = commentCount + (commentCount === 1 ? ' comment' : ' comments');
    }
  });
}

// ==================== UTILITY FUNCTIONS ==================== //

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.classList.add('hidden');
  });

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('active');
  }

  // Load data when switching to certain pages
  if (pageId === 'leaderboard') {
    loadLeaderboard('school');
  } else if (pageId === 'contributions') {
    loadMyContributions();
  } else if (pageId === 'feed') {
    loadSocialFeed();
  } else if (pageId === 'search') {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '<p style="color: var(--text-muted);">Start typing to search for users...</p>';
  }
}

function updateNavbar() {
  if (currentUser) {
    document.getElementById('navbar').classList.remove('hidden');
  } else {
    document.getElementById('navbar').classList.add('hidden');
  }
}

function getStreakDays() {
  const today = new Date().toLocaleDateString();
  const lastActivity = currentUserData.lastActivityDate;
  
  if (lastActivity === today) {
    return currentUserData.streak || 1;
  } else {
    return 1;
  }
}

// ==================== INITIALIZATION ==================== //

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loadUserData();
    updateNavbar();
    showPage('dashboard');
  } else {
    showPage('landing');
    updateNavbar();
  }
});

// Demo data for testing (optional)
function createDemoData() {
  db.collection('contributions').add({
    userId: 'demo',
    userName: 'Demo User',
    userRole: 'high-school',
    actionType: 'Water Saving',
    caption: 'Installed water-saving taps in our home',
    hashtags: '#SDG6 #WaterSaving',
    xpEarned: 25,
    verified: true,
    createdAt: new Date(),
    timestamp: new Date().getTime()
  });
}
