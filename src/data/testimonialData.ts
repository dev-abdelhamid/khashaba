
export interface Testimonial {
  id: number;
  name: { ar: string; en: string };
  quote: { ar: string; en: string };
  media: { type: 'video' | 'audio' | 'image'; src: string; poster?: string };
  rating: number;
  occupation: { ar: string; en: string };
}

export const testimonials: Testimonial[] = [
  
  

  
    {
    id: 1,
    name: { ar: 'سلمي', en: 'Salma' },
     quote: {
      ar: '', // Empty for image
      en: ''
    },
        media: { type: 'image', src: '/smile-rev.jpg' ,poster: '/smile-rev.jpg'},

    rating: 5,
    occupation: { ar: 'مهندس', en: 'Engineer' }
  },

  {
    id: 2,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for video with captions
      en: ''
    },
    media: { type: 'video', src: '/rev.mp4', poster: '/Dr-nehad-rev.mp4' },
    rating: 5,
    occupation: { ar: 'مديرة تسويق', en: 'Marketing Manager' }
  },
 

  {
    id: 3,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for image
      en: ''
    },
        media: { type: 'image', src: '/case1.jpg' ,poster: '/case1.jpg'},

    rating: 4,
    occupation: { ar: 'طالب جامعي', en: 'University Student' }
  },
    {
    id: 4,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for image
      en: ''
    },
    media: { type: 'video', src: '/ksa-rev.mp4' , poster: '/ksa-rev.mp4' },
    rating: 4,
    occupation: { ar: 'طالب جامعي', en: 'University Student' }
  },
  {
    id: 5,
    name: { ar: 'ليلى محمد', en: 'Laila Mohamed' },
    quote: {
      ar: '', // Empty for image
      en: ''
    },
    media: { type: 'image', src: '/rev.jpg' , poster: '/rev.jpg' },
    rating: 5,
    occupation: { ar: 'ربة منزل', en: 'Homemaker' }
  },

  {

    id: 6,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for video with captions
      en: ''
    },
    media: { type: 'video', src: '/Dr-nehad-rev.mp4' , poster: '/Dr-nehad-rev.mp4' },
    rating: 5,
    occupation: { ar: 'مديرة تسويق', en: 'Marketing Manager' }
  },


    {
    id: 7,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for video with captions
      en: ''
    },
    media: { type: 'video', src: '/ksa2-rev.mp4', poster: '/ksa2-rev.mp4' },
    rating: 5,
    occupation: { ar: 'مديرة تسويق', en: 'Marketing Manager' }
  },
   {
        id: 8,
    name: { ar: ' ', en: ' ' },
    quote: {
      ar: '', // Empty for video with captions
      en: ''
    },
    media: { type: 'video', src: '/Just a try-in .. ✨.mp4', poster: '/Just a try-in .. ✨.mp4' },
    rating: 5,
    occupation: { ar: 'مديرة تسويق', en: 'Marketing Manager' }
  },

];



