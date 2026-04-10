import "./App.css";
import { PostsList } from './components/PostsList/PostsList';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>The Daily Posts</h1>
        <p className="subtitle">News from verified sources</p>
      </header>

      <main className="main">
        <PostsList />
      </main>

      <footer className="footer">
        <p>© 2024 The Daily Posts | All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
