
const basicURL = "https:localhost/api/"

export default async function globalSetup(config) {
    const data = await fetch(basicURL + "authenticate");
    console.log(data);
}