
export default function NotFound() {
  const styles :any = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      background: "linear-gradient(to bottom right, #1a1a2e, #16213e)",
      color: "white",
      padding: "20px",
    },
    title: {
      fontSize: "20vw",
      fontWeight: "800",
      color: "#ff4b5c",
      textShadow: "4px 4px 10px rgba(255, 75, 92, 0.8)",
      animation: "glitch 0.7s infinite alternate",
    },
    message: {
      fontSize: "1.5rem",
      marginTop: "10px",
      opacity: "0.9",
    },
    button: {
      marginTop: "20px",
      padding: "12px 24px",
      fontSize: "1.2rem",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s, background-color 0.3s",
    },
    buttonHover: {
      transform: "scale(1.05)",
      backgroundColor: "#0056b3",
    },
    keyframes: `
      @keyframes glitch {
        0% { text-shadow: 4px 4px 0px #ff00ff, -4px -4px 0px #00ffff; }
        50% { text-shadow: -4px -4px 0px #ff00ff, 4px 4px 0px #00ffff; }
        100% { text-shadow: 4px 4px 0px #ff00ff, -4px -4px 0px #00ffff; }
      }
    `,
  };

  return (
    <div style={styles.container}>
      <style>{styles.keyframes}</style>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! Page not found.</p>
      <a href="/" style={styles.button}>
        Go back home
      </a>
    </div>
  );
}