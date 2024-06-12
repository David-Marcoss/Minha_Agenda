<template>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Minha Agenda</strong> by <a href="https://www.linkedin.com/in/david-marcos-1644a421a/" target="_blank">David Marcos</a>
        </p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterVue'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #f5f5f5;
    padding: 1rem;
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  
  .footer .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  </style>
  