const form = document.querySelector('#emotionForm');
const textInput = document.querySelector('#textInput');
const errorMessage = document.querySelector('#errorMessage');
const loading = document.querySelector('#loading');
const resultsSection = document.querySelector('#resultsSection');
const angerScore = document.querySelector('#angerScore');
const disgustScore = document.querySelector('#disgustScore');
const fearScore = document.querySelector('#fearScore');
const joyScore = document.querySelector('#joyScore');
const sadnessScore = document.querySelector('#sadnessScore');
const dominantEmotion = document.querySelector('#dominantEmotion');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = textInput.value.trim();

    errorMessage.style.display = 'none';
    resultsSection.style.display = 'none';

    if (!text) {
        errorMessage.textContent = 'Please enter text to analyze emotion.';
        errorMessage.style.display = 'block';
        return;
    }

    loading.style.display = 'flex';

    try {
        const response = await fetch('/emotionDetector', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text_to_analyze: text })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || 'Unable to analyze emotions. Please try again.';
            errorMessage.style.display = 'block';
            loading.style.display = 'none';
            return;
        }

        angerScore.textContent = data.anger !== null ? data.anger.toFixed(3) : 'N/A';
        disgustScore.textContent = data.disgust !== null ? data.disgust.toFixed(3) : 'N/A';
        fearScore.textContent = data.fear !== null ? data.fear.toFixed(3) : 'N/A';
        joyScore.textContent = data.joy !== null ? data.joy.toFixed(3) : 'N/A';
        sadnessScore.textContent = data.sadness !== null ? data.sadness.toFixed(3) : 'N/A';
        dominantEmotion.textContent = data.dominant_emotion || 'N/A';

        resultsSection.style.display = 'grid';
        loading.style.display = 'none';
    } catch (error) {
        errorMessage.textContent = 'Connection error. Please ensure the backend is running.';
        errorMessage.style.display = 'block';
        loading.style.display = 'none';
    }
});
