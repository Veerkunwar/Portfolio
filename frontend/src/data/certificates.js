// Add one object per certificate. The gallery renders whatever is in this array,
// so it starts empty rather than filled with placeholder achievements.
//
// Example entry:
// {
//   id: "cert-1",
//   title: "Certificate Title",
//   issuer: "Issuing Organization",
//   date: "2025-01",              // YYYY-MM
//   image: "/assets/certificates/cert-1.png",
//   fileUrl: "/assets/certificates/cert-1.pdf", // used for the Download button
// }

export const certificates = [
  {
    id: "gfg-160",
    title: "GfG 160 - 160 Days of Problem Solving",
    issuer: "GeeksforGeeks",
    date: "2025-26", // fill in the month/year you completed it — not printed on the certificate
    image: "/assets/certificates/dsa.png",
  },
  {
    id: "explorin-internship",
    title: "Summer Internship and Training",
    issuer: "Explorin Academy",
    date: "2024-08", // 10 Jun'24 – 10 Aug'24, using the end date
    image: "/assets/certificates/mern.png",
  },
  {
    id: "explorin-data-science",
    title: "Data Science Workshop — IIT Roorkee",
    issuer: "Explorin Academy",
    date: "2024-07", // 19 Jul'24 – 21 Jul'24
    image: "/assets/certificates/ds.png",
  },
];
