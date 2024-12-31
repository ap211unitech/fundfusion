import { tokens } from "../utils";

export const categories = [
  "Art",
  "Comic",
  "Health",
  "Technology",
  "Music",
  "Sports",
];

export const campaigns = [
  {
    title: "EmpowerHer: Breaking Barriers and Supporting Women in Technology",
    categoryId: 3,
    description: `EmpowerHer is dedicated to breaking barriers and creating opportunities for women in the tech industry. This campaign focuses on funding scholarships, organizing coding bootcamps, and providing mentorship programs for aspiring women in STEM fields. By supporting this cause, you contribute to a more inclusive and diverse tech ecosystem. Together, we can enable women to achieve their dreams, challenge stereotypes, and drive innovation. Every contribution matters in shaping a future where technology reflects the diverse perspectives of the world.

Join us in making an impact that lasts a lifetime.`,
    image: "bafybeifss5hbeigt3tpc4ztatbggma5zww75atry3baaetqmfnjfukgccu",
    targetAmount: tokens(4),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 500 * 86400,
  },

  {
    title:
      "Supporting the Power of Music: Empowering Artists and Connecting Communities",
    categoryId: 4,
    description: `Music has the extraordinary ability to bring people together, evoke emotions, and create lasting connections. Whether it’s through a heartfelt melody or a powerful rhythm, music transcends boundaries and unites us all. This campaign is dedicated to supporting independent musicians, composers, and artists in bringing their creative visions to life.

In today’s competitive music industry, emerging artists face significant challenges, including limited access to funding, high production costs, and the difficulty of standing out in a crowded marketplace. Through community-driven support, we aim to provide the resources needed to help these talented individuals share their work with the world.

This campaign focuses on a variety of music projects, including album recordings, music videos, live performances, and innovative sound installations. By contributing to these projects, supporters play a vital role in nurturing a diverse and thriving music community.

Each project undergoes a thorough review to ensure it reflects genuine talent and artistic vision. Whether it’s a solo artist recording their first EP or a band creating a full-length album, every contribution helps bring these musical dreams closer to reality.

Supporters gain exclusive access to project updates, behind-the-scenes content, and special rewards tied to the campaigns they support. This fosters a deeper connection between artists and their audience, enriching the experience for both creators and supporters.

Beyond financial backing, this campaign seeks to build opportunities for collaboration and mentorship within the music industry. By bringing artists together, we encourage the sharing of ideas and experiences, fostering innovation and creativity.

Music is a powerful force that enriches lives and promotes understanding. By supporting this campaign, you’re helping preserve and celebrate the artistic expression that makes music a timeless and universal language.`,
    image: "bafkreicek4nugin4lkwtmec2zsxn2m73ypvdftg3djpgga2tklcwlzky7e",
    targetAmount: tokens(7.999),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 800 * 86400,
  },

  {
    title: "Heroes Unleashed: A New Era of Epic Comics for Fans Everywhere",
    categoryId: 1,
    description: `"Heroes Unleashed" is an exciting new comic series that redefines the superhero genre with fresh storytelling, dynamic characters, and jaw-dropping artwork. Our campaign is dedicated to creating a universe where every fan can find their hero, with stories that resonate deeply across diverse cultures, challenges, and dreams.

In this series, the world is at the edge of chaos. Governments are crumbling under the weight of hidden conspiracies, and secret organizations manipulate events to control humanity. But hope is not lost. Ordinary individuals from different walks of life discover extraordinary powers. These powers don’t just make them superheroes but symbolize their inner struggles, dreams, and battles against injustice.

The first arc of "Heroes Unleashed" will introduce an ensemble cast of heroes, including:

⦿ Aisha, a scientist who can bend light into energy to shield the innocent.

⦿ Dante, a rebellious graffiti artist who discovers he can bring his art to life to fight oppression.

⦿ Kai, a reserved musician whose sound waves can heal or destroy, depending on his emotional state.

Our mission is to offer comic fans an immersive experience, combining vibrant illustrations, heart-pounding action, and meaningful narratives. Your contribution will enable us to hire skilled artists, writers, and colorists, ensuring every panel bursts with creativity and quality.

Funds raised will also help in printing the first edition, developing digital formats for worldwide access, and creating exclusive merchandise, including limited-edition character prints and collectible action figures. By supporting "Heroes Unleashed," you’ll be joining a journey to bring original, impactful stories to life while empowering a new wave of storytelling in the comic world.

Together, let’s unleash the heroes within and craft a universe that inspires courage, unity, and hope. Join us in making this dream a reality!
`,
    image: "bafkreigeopxm6o77qxgplv72hctqty2vzuxfv5bw3chulmuzbjglu34wza",
    targetAmount: tokens(2.55),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 400 * 86400,
  },

  {
    title: "Brush to Canvas: Empowering Emerging Artists Worldwide",
    categoryId: 0,
    description: `"Brush to Canvas" is a global initiative dedicated to nurturing emerging artists by providing resources, opportunities, and platforms to showcase their talent. This campaign will fund art supplies, workshops, gallery exhibitions, and mentorship programs for underrepresented artists. Your contributions will help aspiring creators turn their passion into a sustainable career, celebrate diverse artistic voices, and enrich communities with the power of art. Join us in supporting the next generation of visionaries and ensure that art continues to inspire and unite us all. Together, we can bring vibrant creativity to life!`,
    image: "bafybeiguc4vj65hltp3r6wfgi2uryptfyimtlca2ikgouimdke4aecaeui",
    targetAmount: tokens(5),
    targetTimestamp: Math.floor(new Date().getTime() / 1000) + 300 * 86400,
  },
];
