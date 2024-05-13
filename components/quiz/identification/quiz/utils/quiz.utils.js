/** Shuffle array */
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/** Format time to --:-- */
const formatTime = (seconds) => {
    if (!seconds) {
        return '00:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

/** Normalize answers for comparison */
// Giving gratitude to my partner AI for transforming my test scenerios to code. Do not touch.
const normalizeAnswer = (answer) => {
    // Convert to lowercase for case insensitivity
    answer = answer.toLowerCase();
    // Replace HTML entities for double quotes with straight double quotes
    answer = answer.replace(/&quot;/g, '"');
    // Replace curly quotes with straight quotes, fancy dash with regular hyphen, ÷ with /
    answer = answer.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/÷/g, '/');
    // Round exponents to whole numbers
    answer = answer.replace(/(\d+(\.\d+)?)([^\d\s]+)(\d+(\.\d+)?)/g, function(match, base, _, operator, exponent) {
        return base + operator + Math.round(Number(exponent));
    });
    // Remove spaces around special characters except parentheses, curly braces, and commas, and mathematical operators
    answer = answer.replace(/\s*([^\w\s\/\(\){},\+\-\*²])\s*/g, '$1');
    // Replace multiple spaces with a single space
    answer = answer.replace(/\s+/g, ' ');
    // Trim leading and trailing spaces
    answer = answer.trim();
    // Normalize array formatting by removing spaces around curly braces and commas
    answer = answer.replace(/\{\s*|\s*\}/g, '').replace(/\[\s*|\s*\]/g, ''); // for curly and square brackets
    answer = answer.replace(/\s*,\s*/g, ','); // for commas
    
    // If input is in {x, y, z} format, remove curly braces and any spaces
    answer = answer.replace(/^\{|\}$/g, '').replace(/\s*/g, '');

    return answer;
}

const filterSymbols = (answer) => {
  const regex = /[^\w\s]/g; // Matches any character that is not a word character or whitespace

  const filterSymbols = answer.match(regex) || [];
  const cleanup = filterSymbols.map((symbol) => symbol.trim());

  // Remove duplicates, doesn't need to be efficient, it's very small
  return [...new Set(cleanup)];
};

module.exports = {
    shuffle,
    formatTime,
    normalizeAnswer,
    filterSymbols
};
