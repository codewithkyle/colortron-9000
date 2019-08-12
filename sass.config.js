const sass = require('node-sass');
const glob = require("glob");
const fs = require('fs');
const chalk = require('chalk');

const files = glob.sync('./src/**/*.scss');

function compileSASS(){
    console.log(chalk.white('Compiling SASS'));;

    // Generate the files
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        sass.render(
            {
                file: file,
                outputStyle: 'compressed'
            },
            function(error, result){
                if (error) {
                    console.log(chalk.hex('#f57b7b').bold(`SASS Compile Error:`), chalk.white(`${ error.message } at line`), chalk.yellow.bold(error.line), chalk.hex('#ffffff').bold(error.file));
                }else{
                    const fileName = result.stats.entry.match(/[ \w-]+?(?=\.)/gi)[0].toLowerCase();
                    if(fileName){
                        const newFile = `./docs/assets/styles/${ fileName }.css`;
                        console.log(chalk.hex('#ffffff').bold(file), chalk.hex('#8cf57b').bold(' [compiled]'));
                        fs.writeFile(newFile, result.css.toString(), function (err) {
                            if(err){
                                throw err;
                            };
                        });
                    }else{
                        console.log('Something went wrong with the file name of ' + result.stats.entry);
                    }
                }
            }
        );
    }
}

compileSASS();