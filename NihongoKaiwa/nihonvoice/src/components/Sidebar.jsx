import { useState } from 'react'

function Sidebar({ user, onNewChat, chats, onSelectChat, activeChat }) {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div style={{ ...styles.sidebar, width: isOpen ? '260px' : '60px' }}>

            <button
                style={styles.toggleBtn}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '◀' : '▶'}
            </button>

            {isOpen && (
                <>
                    <div style={styles.logo}>
                        <span style={styles.logoText}>日本</span>
                        <span style={styles.logoSub}>NihonVoice</span>
                    </div>

                    <div style={styles.userInfo}>
                        <div style={styles.avatar}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p style={styles.userName}>{user.name}</p>
                            <p style={styles.userLevel}>{user.jlpt} · {user.language}</p>
                        </div>
                    </div>

                    <button style={styles.newChatBtn} onClick={onNewChat}>
                        + New Chat
                    </button>

                    <div style={styles.chatList}>
                        <p style={styles.chatListLabel}>Recent Chats</p>
                        {chats.length === 0 && (
                            <p style={styles.noChats}>No chats yet. Start one!</p>
                        )}
                        {chats.map((chat, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.chatItem,
                                    backgroundColor: activeChat === index
                                        ? 'rgba(255,0,85,0.15)'
                                        : 'transparent'
                                }}
                                onClick={() => onSelectChat(index)}
                            >
                                <span style={styles.chatIcon}>💬</span>
                                <span style={styles.chatTitle}>
                                    {chat.title || 'New Chat'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={styles.bottomLinks}>
                        <button style={styles.linkBtn}>⚙️ Settings</button>
                        <button style={styles.linkBtn}>💬 Feedback</button>
                    </div>
                </>
            )}

        </div>
    )
}

const styles = {
    sidebar: {
        height: '100vh',
        backgroundColor: '#080616',
        borderRight: '1px solid rgba(255,0,85,0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0
    },
    toggleBtn: {
        background: 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#aaa',
        borderRadius: '6px',
        padding: '4px 8px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
        marginBottom: '16px',
        fontSize: '12px'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px'
    },
    logoText: {
        fontSize: '22px',
        color: '#ff0055',
        textShadow: '0 0 10px rgba(255,0,85,0.8)',
        fontWeight: 'bold'
    },
    logoSub: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '10px',
        marginBottom: '16px'
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#ff0055',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        flexShrink: 0
    },
    userName: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'white'
    },
    userLevel: {
        fontSize: '11px',
        color: '#888'
    },
    newChatBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#ff0055',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '20px',
        boxShadow: '0 0 15px rgba(255,0,85,0.3)'
    },
    chatList: {
        flex: 1,
        overflowY: 'auto'
    },
    chatListLabel: {
        fontSize: '11px',
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px'
    },
    noChats: {
        fontSize: '12px',
        color: '#444',
        fontStyle: 'italic'
    },
    chatItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '4px'
    },
    chatIcon: {
        fontSize: '14px'
    },
    chatTitle: {
        fontSize: '13px',
        color: '#ccc',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    bottomLinks: {
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    linkBtn: {
        background: 'none',
        border: 'none',
        color: '#666',
        fontSize: '13px',
        cursor: 'pointer',
        textAlign: 'left',
        padding: '6px 4px',
        borderRadius: '6px'
    }
}

export default Sidebar