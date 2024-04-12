export function capitalizeAllWords(sentence = "") {
    // Split the sentence into words
    let words = sentence.split(" ");
    
    // Capitalize each word
    let capitalizedWords = words?.map(word => word.charAt(0)?.toUpperCase() + word?.slice(1));
    
    // Join the capitalized words back into a sentence
    let capitalizedSentence = capitalizedWords.join(" ");
    
    return capitalizedSentence;
}