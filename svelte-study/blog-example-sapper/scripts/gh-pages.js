var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/svelte-study/blog-example-sapper',// <-- replace yourproject with your repo name
    {
        branch: 'gh-pages',
        dest: 'blog-example-sapper'
    },
    (error) => {
      if(error){
        console.log('Error on deploy:');
        console.error(error);
        return;
      }
      console.log('Deploy Complete!')
    }
)