function ChatWindow({ messages }) {
    return (
        <div style={styles.container}>
            {messages.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyKanji}>話しましょう</p>
                    <p style={styles.emptyText}>Let's talk! Type a topic below to start.</p>
                    <p style={styles.emptyExample}>Try: "Talk about Tokyo" or "Tell me about food"</p>
                </div>
            )}
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.bubble,
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.role === 'user'
                            ? 'rgba(255,0,85,0.2)'
                            : 'rgba(0,200,255,0.1)',
                        borderColor: msg.role === 'user'
                            ? 'rgba(255,0,85,0.4)'
                            : 'rgba(0,200,255,0.3)'
                    }}
                >
                    <p style={styles.bubbleText}>{msg.text}</p>
                    <button style={styles.translateBtn}>🌐</button>
                </div>
            ))}
        </div>
    )
}

const styles = {
    container: {
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    emptyState: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px'
    },
    emptyKanji: {
        fontSize: '48px',
        color: '#ff0055',
        textShadow: '0 0 20px rgba(255,0,85,0.6)',
        marginBottom: '16px'
    },
    emptyText: {
        fontSize: '16px',
        color: '#888',
        marginBottom: '8px'
    },
    emptyExample: {
        fontSize: '13px',
        color: '#444'
    },
    bubble: {
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid',
        position: 'relative'
    },
    bubbleText: {
        fontSize: '15px',
        color: 'white',
        lineHeight: '1.5'
    },
    translateBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '6px',
        opacity: 0.6
    }
}

export default ChatWindow