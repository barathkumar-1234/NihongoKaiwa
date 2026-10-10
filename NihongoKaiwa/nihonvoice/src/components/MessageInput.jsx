import { useState } from 'react'

function MessageInput({ onSend }) {
    const [text, setText] = useState('')

    function handleSend() {
        if (!text.trim()) return
        onSend(text)
        setText('')
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Type a topic or message... e.g. 'Talk about Tokyo'"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button style={styles.micBtn}>🎤</button>
                <button style={styles.sendBtn} onClick={handleSend}>Send</button>
            </div>
            <p style={styles.hint}>Press Enter to send · 🎤 for voice input</p>
        </div>
    )
}

const styles = {
    container: {
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,0,85,0.2)',
        backgroundColor: '#080616'
    },
    inputRow: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid rgba(255,0,85,0.3)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'white',
        fontSize: '14px',
        outline: 'none'
    },
    micBtn: {
        padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    sendBtn: {
        padding: '12px 20px',
        backgroundColor: '#ff0055',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 0 15px rgba(255,0,85,0.3)'
    },
    hint: {
        fontSize: '11px',
        color: '#444',
        marginTop: '8px',
        textAlign: 'center'
    }
}

export default MessageInput