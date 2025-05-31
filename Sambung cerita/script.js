// Konfigurasi Firebase (ganti dengan milikmu nanti)
const firebaseConfig = {
  apiKey: "AIzaSyBQi97ruW0fQeUgSooXJwz_Tr8HLRk-Eow",
  authDomain: "sambung-cerita-app.firebaseapp.com",
  databaseURL: "https://sambung-cerita-app-default-rtdb.firebaseio.com", 
  projectId: "sambung-cerita-app",
  storageBucket: "sambung-cerita-app.firebasestorage.app",
  messagingSenderId: "1063987187882",
  appId: "1:1063987187882:web:d5c24b613f5193a9b800d3"
};

firebase.initializeApp(firebaseConfig);

// Toggle Dark Mode
document.getElementById('darkModeToggle')?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Simpan Cerita Baru
document.getElementById('newStoryForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const first = document.getElementById('firstParagraph').value.trim();

  if (!title || !first) return;

  firebase.database().ref('stories/').push({
    title: title,
    parts: [{ author: "User", text: first }],
    timestamp: Date.now()
  });

  alert("Cerita berhasil dipublikasikan!");
});

// Tampilkan Cerita di Index
firebase.database().ref('stories/').on('value', snapshot => {
  const stories = snapshot.val();
  const container = document.getElementById('storyList');
  container.innerHTML = "";

  if (!stories) {
    container.innerHTML = "<p>Belum ada cerita. Yuk mulai yang pertama!</p>";
    return;
  }

  for (const key in stories) {
    const story = stories[key];
    container.innerHTML += `
      <div class="story-card">
        <h3>${story.title}</h3>
        <p><strong>Oleh:</strong> ${story.parts[0].author}</p>
        <p>${story.parts[0].text.slice(0, 100)}...</p>
        <a href="story.html?id=${key}" class="btn-read">Lanjutkan Cerita →</a>
      </div>
    `;
  }
});