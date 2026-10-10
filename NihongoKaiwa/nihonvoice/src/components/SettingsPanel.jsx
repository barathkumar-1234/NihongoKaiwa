import SpeedSlider from './SpeedSlider'

function SettingsPanel({ settings, onSettingsChange, onClose }) {

    function handleChange(key, value) {
        onSettingsChange({ ...settings, [key]: value })
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>

                <div style={styles.header}>
                    <h2 style={styles.title}>⚙️ Settings</h2>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div style={styles.divider} />

                <div style={styles.section}>
                    <p style={styles.sectionTitle}>Audio Speed</p>
                    <SpeedSlider
                        speed={settings.speed}
                        onSpeedChange={(val) => handleChange('speed', val)}
                    />
                </div>

                <div style={styles.section}>
                    <p style={styles.sectionTitle}>Kanji</p>
                    <div style={styles.toggleRow}>
                        <span style={styles.toggleLabel}>
                            Show Kanji in AI replies
                        </span>
                        <div
                            style={{
                                ...styles.toggle,
                                backgroundColor: settings.kanjiOn
                                    ? '#ff0055'
                                    : 'rgba(255,255,255,0.1)'
                            }}
                            onClick={() => handleChange('kanjiOn', !settings.kanjiOn)}
                        >
                            <div style={{
                                ...styles.toggleThumb,
                                transform: settings.kanjiOn
                                    ? 'translateX(22px)'
                                    : 'translateX(2px)'
                            }} />
                        </div>
                    </div>
                    <p style={styles.toggleHint}>
                        {settings.kanjiOn
                            ? 'AI will use kanji in replies'
                            : 'AI will reply in hiragana only'}
                    </p>
                </div>

                <div style={styles.section}>
                    <p style={styles.sectionTitle}>Translation Language</p>
                    <select
                        style={styles.select}
                        value={settings.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                    >
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Hindi</option>
                        <option>Malayalam</option>
                        <option>Telugu</option>
                        <option>Arabic</option>
                    </select>
                </div>

                <div style={styles.section}>
                    <p style={styles.sectionTitle}>Speech Mode</p>
                    <div style={styles.speechOptions}>
                        {['Speech to Text', 'Text to Speech', 'Both'].map((mode) => (
                            <button
                                key={mode}
                                style={{
                                    ...styles.speechBtn,
                                    backgroundColor: settings.speechMode === mode
                                        ? '#ff0055'
                                        : 'rgba(255,255,255,0.05)',
                                    borderColor: settings.speechMode === mode
                                        ? '#ff0055'
                                        : 'rgba(255,255,255,0.1)'
                                }}
                                onClick={() => handleChange('speechMode', mode)}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <button style={styles.saveBtn} onClick={onClose}>
                    Save Settings
                </button>

            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    panel: {
        backgroundColor: '#0d0a1f',
        borderRadius: '16px',
        padding: '28px',
        width: '90%',
        maxWidth: '440px',
        border: '1px solid rgba(255,0,85,0.3)',
        boxShadow: '0 0 40px rgba(255,0,85,0.15)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    title: {
        fontSize: '18px',
        color: 'white'
    },
    closeBtn: {
        background: 'none',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#aaa',
        borderRadius: '6px',
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    divider: {
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,0,85,0.4), transparent)',
        marginBottom: '20px'
    },
    section: {
        marginBottom: '24px'
    },
    sectionTitle: {
        fontSize: '12px',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px'
    },
    toggleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px'
    },
    toggleLabel: {
        fontSize: '14px',
        color: 'white'
    },
    toggle: {
        width: '46px',
        height: '26px',
        borderRadius: '13px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s'
    },
    toggleThumb: {
        position: 'absolute',
        top: '3px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
        transition: 'transform 0.2s'
    },
    toggleHint: {
        fontSize: '12px',
        color: '#00c8ff'
    },
    select: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'white',
        fontSize: '14px'
    },
    speechOptions: {
        display: 'flex',
        gap: '8px'
    },
    speechBtn: {
        flex: 1,
        padding: '8px',
        border: '1px solid',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '12px'
    },
    saveBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ff0055',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 0 20px rgba(255,0,85,0.3)'
    }
}

export default SettingsPanel