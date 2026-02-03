export default {
  async fetch(request) {
    // Redirect to your PDF
    return Response.redirect('https://javlim.dev/resume.pdf', 302);
  }
};