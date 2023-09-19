module.exports = {
  beginner: (dialect, readTime, genre) => {

    return [
      {
        "role": "system",
        "content": "You are an expert in writing short stories in Spanish for English-speaking learners. It's crucial that you adhere to the CEFR proficiency level specified to match the learners reading ability. The dialect, read time, and other customizations must also be strictly followed. Please include a story title as the first sentence followed by the story."
      },
      {
        "role": "user",
        "content": `Please write a Spanish story with the following parameters. dialect: latin, read_time: ${readTime}, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language.`
      },
      {
        "role": "assistant",
        "content": "Paseo de Pedro\n\nMe llamo Pedro. Vivo cerca de un bonito parque. Todos los días, después de la escuela, voy al parque. Me gusta mucho estar allí. El parque tiene muchos árboles y flores. Las palomas caminan y comen en el suelo. Los pájaros cantan en los árboles. A las cinco de la tarde, siempre encuentro a mis amigos. Juan, con su pelota roja, y Luis, con su libro de cuentos. Jugamos al escondite entre los árboles y a veces contamos historias. Luis a menudo nos habla de su escuela de música. Quiere ser pianista. Mi padre también visita el parque. Lleva zapatillas y corre por el camino. Dice que es su ejercicio. Mi madre viene los fines de semana. Ella trae una manta y se sienta. A veces nos compra helados. Cada mañana, al ir al colegio, cruzo el parque. El amable guarda siempre está allí. Me saluda y a veces me regala un caramelo de fresa. Es mi sabor favorito. Siempre pienso que es un buen inicio para mi día."
      },
      {
        "role": "user",
        "content": `Please write a Spanish story with the following parameters. dialect: ${dialect}, read_time: ${readTime}, genre: ${genre}, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language.`
      }]
  },
  intermediate: [
    {
      "role": "system",
      "content": "You are an expert in writing short stories in Spanish for English-speaking learners. It's crucial that you adhere to the CEFR proficiency level specified to match the learners reading ability. The dialect, read time, and other customizations must also be strictly followed. Please include a story title as the first sentence followed by the story."
    },
    {
      "role": "user",
      "content": "Please write a Spanish story with the following parameters. dialect: latin, read_time: 1 minute, pov: first-person, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive almost exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language."
    },
    {
      "role": "assistant",
      "content": "Paseo de Pedro\n\nMe llamo Pedro y hoy quiero hablar del parque que hay junto a mi casa. Yo me divierto todos los días en el parque. Allí veo las palomas comiendo y bebiendo agua. También veo pájaros de colores en los árboles. Voy al parque a las cinco de la tarde, cuando termino los deberes de la escuela. Allí veo a mi amigo Juan y a mi amigo Luis. Con ellos juego al escondite y a otros juegos muy entretenidos. Luis se va más temprano del parque porque tiene que ir a la escuela de música a aprender a tocar el piano. Mi padre también va al parque a hacer deporte. Él corre durante una hora después de trabajar. Mi madre solo va los fines de semana porque acaba tarde de trabajar. Ella se sienta siempre en el mismo banco y yo juego mientras con mis amigos. Por la mañana cruzo el parque para ir al colegio, pero no me entretengo para no llegar tarde a clase. De camino al colegio veo al guarda del parque y siempre me da un caramelo de fresa."
    },
    {
      "role": "user",
      "content": "Please write a Spanish story with the following parameters. dialect: latin, read_time: 2-2.5 minutes, genre: romance, pov: third-person, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive almost exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language."
    }],
  advanced: [
    {
      "role": "system",
      "content": "You are an expert in writing short stories in Spanish for English-speaking learners. It's crucial that you adhere to the CEFR proficiency level specified to match the learners reading ability. The dialect, read time, and other customizations must also be strictly followed. Please include a story title as the first sentence followed by the story."
    },
    {
      "role": "user",
      "content": "Please write a Spanish story with the following parameters. dialect: latin, read_time: 1 minute, pov: first-person, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive almost exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language."
    },
    {
      "role": "assistant",
      "content": "Paseo de Pedro\n\nMe llamo Pedro y hoy quiero hablar del parque que hay junto a mi casa. Yo me divierto todos los días en el parque. Allí veo las palomas comiendo y bebiendo agua. También veo pájaros de colores en los árboles. Voy al parque a las cinco de la tarde, cuando termino los deberes de la escuela. Allí veo a mi amigo Juan y a mi amigo Luis. Con ellos juego al escondite y a otros juegos muy entretenidos. Luis se va más temprano del parque porque tiene que ir a la escuela de música a aprender a tocar el piano. Mi padre también va al parque a hacer deporte. Él corre durante una hora después de trabajar. Mi madre solo va los fines de semana porque acaba tarde de trabajar. Ella se sienta siempre en el mismo banco y yo juego mientras con mis amigos. Por la mañana cruzo el parque para ir al colegio, pero no me entretengo para no llegar tarde a clase. De camino al colegio veo al guarda del parque y siempre me da un caramelo de fresa."
    },
    {
      "role": "user",
      "content": "Please write a Spanish story with the following parameters. dialect: latin, read_time: 2-2.5 minutes, genre: romance, pov: third-person, CEFR Proficiency level and description: A1/Super-Beginner = Use simple present tense and present progressive almost exclusively. Rely heavily on common, everyday vocabulary. Include basic, concrete actions (e.g., eating, walking). Use short sentences. Avoid passive voice, conditional, or subjunctive moods. Focus on immediate environments like the home, school, or local area. Limit the story to one main character or subject. Please use only the most common 200-300 words in the Spanish language."
    }],
}