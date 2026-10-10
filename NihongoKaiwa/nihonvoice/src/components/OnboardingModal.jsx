import { useState } from 'react'

function OnboardingModal({ onComplete }) {
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [language, setLanguage] = useState('English')
    const [confidence, setConfidence] = useState(5)
    const [jlpt, setJlpt] = useState('None')

    function handleSubmit() {
        if (!name || !country) {
            alert('Please enter your name and country!')
            return
        }
        const userProfile = { name, country, language, confidence, jlpt }
        localStorage.setItem('nihonvoice_user', JSON.stringify(userProfile))
        onComplete(userProfile)
    }

    return (
        <div style={styles.overlay}>

            <div style={styles.cityGlow} />

            <div style={styles.modal}>

                <div style={styles.japaneseStrip}>
                    <span style={styles.kanji}>日本語</span>
                    <span style={styles.kanji}>東京</span>
                    <span style={styles.kanji}>夜</span>
                    <span style={styles.kanji}>声</span>
                    <span style={styles.kanji}>学習</span>
                </div>

                <h1 style={styles.title}>
                    NihonVoice
                    <span style={styles.titleAccent}> へようこそ</span>
                </h1>
                <p style={styles.subtitle}>Your Japanese night school starts here</p>

                <div style={styles.divider} />

                <div style={styles.field}>
                    <label style={styles.label}>Your Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Country</label>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Enter your country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Preferred Translation Language</label>
                    <select
                        style={styles.input}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Hindi</option>
                        <option>Malayalam</option>
                        <option>Telugu</option>
                        <option>Arabic</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>
                        Japanese Confidence Level:
                        <span style={styles.confidenceNum}> {confidence}/10</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={confidence}
                        onChange={(e) => setConfidence(e.target.value)}
                        style={styles.slider}
                    />
                    <div style={styles.sliderLabels}>
                        <span>Complete beginner</span>
                        <span>Fluent</span>
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>JLPT Level</label>
                    <select
                        style={styles.input}
                        value={jlpt}
                        onChange={(e) => setJlpt(e.target.value)}
                    >
                        <option>None</option>
                        <option>N5</option>
                        <option>N4</option>
                        <option>N3</option>
                        <option>N2</option>
                        <option>N1</option>
                    </select>
                </div>

                <button
                    style={styles.button}
                    onClick={handleSubmit}
                    onMouseEnter={e => e.target.style.backgroundColor = '#ff2d6d'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#ff0055'}
                >
                    学習を始める — Start Learning
                </button>

                <p style={styles.bottomNote}>
                    東京の夜へようこそ — Welcome to the Tokyo night
                </p>

            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#03010a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflow: 'hidden'
    },
    cityGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to top, rgba(255,0,85,0.08), rgba(0,200,255,0.05), transparent)',
        pointerEvents: 'none'
    },
    modal: {
        backgroundColor: 'rgba(10, 8, 25, 0.95)',
        borderRadius: '16px',
        padding: '36px',
        width: '90%',
        maxWidth: '480px',
        color: 'white',
        border: '1px solid rgba(255,0,85,0.3)',
        boxShadow: '0 0 40px rgba(255,0,85,0.15), 0 0 80px rgba(0,200,255,0.08)',
        position: 'relative',
        zIndex: 2
    },
    japaneseStrip: {
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        justifyContent: 'center'
    },
    kanji: {
        fontSize: '18px',
        color: '#ff0055',
        textShadow: '0 0 10px rgba(255,0,85,0.8)',
        fontWeight: 'bold'
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '6px',
        color: '#ffffff'
    },
    titleAccent: {
        color: '#00c8ff',
        textShadow: '0 0 10px rgba(0,200,255,0.7)',
        fontSize: '20px'
    },
    subtitle: {
        fontSize: '13px',
        color: '#888',
        marginBottom: '20px'
    },
    divider: {
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,0,85,0.5), rgba(0,200,255,0.5), transparent)',
        marginBottom: '24px'
    },
    field: {
        marginBottom: '18px'
    },
    label: {
        display: 'block',
        fontSize: '12px',
        color: '#aaa',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    confidenceNum: {
        color: '#ff0055',
        textShadow: '0 0 8px rgba(255,0,85,0.6)'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'white',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none'
    },
    slider: {
        width: '100%',
        accentColor: '#ff0055'
    },
    sliderLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#666',
        marginTop: '4px'
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#ff0055',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '8px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        boxShadow: '0 0 20px rgba(255,0,85,0.4)',
        transition: 'background-color 0.2s'
    },
    bottomNote: {
        textAlign: 'center',
        fontSize: '11px',
        color: '#444',
        marginTop: '16px'
    }
}

export default OnboardingModal