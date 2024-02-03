import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section style={{ height: "100%", maxHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <h1 style={{ fontSize: "var(--extraLargeFontSize)", maxWidth: "500px", textAlign: 'center' }}>Discover the world&apos;s top designers & creatives</h1>

        <p style={{ color: "var(--tone20)" }}>find talents and connect with creative people</p>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", width: "80%", maxWidth: "600px", borderRadius: "1rem", overflow: "clip", border: '2px solid var(--tone95)' }}>
          <div style={{ padding: ".5rem", backgroundColor: "var(--tone95)", display: "grid", alignItems: 'center', justifyItems: "center" }}>
            <svg style={{ width: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
          </div>

          <input type="text" placeholder="Filter by name" />
        </div>

        <div style={{ display: 'flex', flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <p style={{ color: "var(--tone20)" }}>Trending searches</p>

          <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
            <p style={{ padding: '.2rem 1rem', borderRadius: ".5rem", backgroundColor: 'var(--tone95)' }}>Example</p>
            <p style={{ padding: '.2rem 1rem', borderRadius: ".5rem", backgroundColor: 'var(--tone95)' }}>Example2</p>
            <p style={{ padding: '.2rem 1rem', borderRadius: ".5rem", backgroundColor: 'var(--tone95)' }}>Example3</p>
          </div>
        </div>
      </section>
    </main>
  );
}
