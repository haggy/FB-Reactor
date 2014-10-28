var argv = require('minimist')(process.argv.slice(2));
var Factory = require(__dirname + '/lib/component-factory');
var colors = require('colors');


var exitNormal = function() { process.exit(0); }
var exitCrappy = function() { process.exit(-1); }

//console.dir(argv);

var CWD = process.cwd();
var cmd = argv._[0];
var thing = argv._[1];


if(cmd === 'create') {
    switch(thing) {
        case 'reactorfile':
            console.log('Creating default reactorfile..'.grey);

            var appRoot = argv['basedir'];
            Factory.createReactorfile({ app_root: appRoot })
                .then(function(res) {
                    console.log('reactorfile generated!'.green);
                    exitNormal();
                })
                .catch(function(err) {
                    var msg = 'Ah crap! We encountered a problem.\n' +
                                'We spit the error out below. If it sucks, let us know about it!\n';
                    console.log(msg.red);
                    console.log(err);
                    console.log('\n\n');
                    exitCrappy();
                });
            break;

        case 'framework':
            console.log('Creating all the framework..'.grey);
            Factory.createFramework()
                .then(function done(results) {
                    var errorCount = 0;
                    var errorList = [];
                    results.forEach(function(prom) {
                        if(prom.state === 'rejected') {
                            errorCount++;
                            errorList.push('Error type: ' + prom.reason.code + ' -- Path: ' + prom.reason.path);
                        }
                    });

                    if(errorCount > 0) {
                        console.log('Uh oh, we ran into errors!\nIf the error below '.red + 
                                    'doesn\'t help, let us know!\n'.red);
                        console.log(errorList.join('\n').red + '\n\nCompleted with errors.');
                    } else {
                        console.log('Your framework is ready! Now you can use the other create\n'.green +
                                'types to make your components!'.green);
                    }

                    exitNormal();
                })
                .catch(function(err) {
                    var msg = 'Ah crap! We encountered a problem.\n' +
                                'We spit the error out below. If it sucks, let us know about it!\n';
                    console.log(msg.red);
                    console.log(err);
                    console.log('\n\n');
                    exitCrappy();
                });
            break;

        case 'component':
            var compName = argv['name'];
            if(!compName) {
                console.log('You need to give your component a name!\nUse the --name flag.'.red);
                exitCrappy();
            }

            console.log('Creating a full component...'.grey);
            Factory.createFullComponent({name: compName})
                .then(function(results) {
                    console.log('All done, enjoy your shiny new component!'.green);
                    exitNormal();
                })
                .catch(function(err) {
                    var msg = 'Ah crap! We encountered a problem.\n' +
                                'We spit the error out below. If it sucks, let us know about it!\n\n';
                    console.log(msg.red);
                    console.log(err);
                    exitCrappy();
                });
            break;
        
    }
}













