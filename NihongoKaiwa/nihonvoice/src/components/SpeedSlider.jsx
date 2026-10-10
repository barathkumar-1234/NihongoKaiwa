function SpeedSlider({ speed, onSpeedChange }) {

    const speeds = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5]

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.label}>Audio Speed</span>
                <span style={styles.speedDisplay}>{speed}x</span>
            </div>

            <input
                type="range"
                min="0.25"
                max="1.5"
                step="0.25"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                style={styles.slider}
            />

            <div style={styles.marks}>
                {speeds.map((s) => (
                    <span
                        key={s}
                        style={{
                            ...styles.mark,
                            color: speed === s ? '#ff0055' : '#555'
                        }}
                    >
                        {s}x
                    </span>
                ))}
            </div>

            <p style={styles.hint}>
                {speed <= 0.5 && 'Very slow — perfect for beginners'}
                {speed === 0.75 && 'Slow — easy to follow'}
                {speed === 1.0 && 'Normal — native speed'}
                {speed >= 1.25 && 'Fast — challenge yourself!'}
            </p>

        </div>
    )
}

const styles = {
    container: {
        padding: '16px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255,0,85,0.2)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    label: {
        fontSize: '13px',
        color: '#aaa',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    speedDisplay: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ff0055',
        textShadow: '0 0 10px rgba(255,0,85,0.6)'
    },
    slider: {
        width: '100%',
        accentColor: '#ff0055',
        marginBottom: '8px'
    },
    marks: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    mark: {
        fontSize: '11px',
        transition: 'color 0.2s'
    },
    hint: {
        fontSize: '12px',
        color: '#00c8ff',
        textAlign: 'center',
        minHeight: '18px'
    }
}

export default SpeedSlider