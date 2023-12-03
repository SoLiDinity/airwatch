// TODO 3 tampilan About Page

const About = {
  async render() {
    return `
    <div class="main">
      <div class="hero" style="flex-grow: 1">
        <div>
          <p>Aplikasi Pemantau Kualitas Udara Indonesia</p>
          <h2>Tentang <br> AirWatchID</h2>
        </div>

        <div class="image2">
        </div>
      </div>
    <section class="reviews">
    <h1 class="heading">Tentang Kami</h1>
            <div class="box-container">
          <div class="box">
            <div class="student">
              <img
              src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg&uid=R118614792&ga=GA1.1.791807358.1696633673&semt=sph" 
                
                alt="" />
              <div>
                <h4>Leonardo Denavito Jounanda Prishamora</h4>
              </div>
            </div>
          </div>
    
          <div class="box">
            <div class="student">
              <img
              src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?size=626&ext=jpg&uid=R118614792&ga=GA1.1.791807358.1696633673&semt=sph"
                alt="" />
                <div>
                  <h4>Novita Kristiana</h4>
          </div>
        </div>
        </div>

        <div class="box">
            <div class="student">
              <img
                src="https://img.freepik.com/free-photo/portrait-handsome-young-man-with-crossed-arms_176420-15569.jpg?size=626&ext=jpg&uid=R118614792&ga=GA1.1.791807358.1696633673&semt=sph.jpg"
                alt="" />
              <div>
                <h4>Muhammad Arif Rahman</h4>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="student">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-asia-lady-with-positive-expression-arms-crossed-smile-broadly-dressed-casual-clothing-looking-camera-pink-background_7861-3201.jpg?size=626&ext=jpg&uid=R118614792&ga=GA1.1.791807358.1696633673&semt=sph"
                alt="" />
              <div>
                <h4>Andi Nabila Fadiya</h4>
              </div>
            </div>
          </div>
        
          <div class="center">
          <div class="box">
            <div class="student">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-handsome-smiling-businessman-holding-laptop-hands-typing-browsing-web-pages-isolated-white-background_1150-63247.jpg?size=626&ext=jpg&uid=R118614792&ga=GA1.1.791807358.1696633673&semt=sph"
                alt="" />
              <div>
                <h4>Chary Yedija Adcharisto Sembel</h4>
              </div>
            </div>
          </div>
          </div>
          `;
  },

  async afterRender() {
    // after render mainpage
  },
};

export default About;
