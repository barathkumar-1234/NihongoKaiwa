export async function getJapaneseReply(userMessage, settings) {
    const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage,
            kanjiOn: settings.kanjiOn
        })
    })

    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    }

    return data.reply
}