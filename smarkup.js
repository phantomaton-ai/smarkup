function smarkup(input) {
    let directives = [];
    let lines = input.split('\n');
    let currentDirective = null;

    for (let line of lines) {
        if (line.startsWith('/')) {
            // Start of a new directive
            if (currentDirective) {
                if (Array.isArray(currentDirective.body)) {
                    currentDirective.body = currentDirective.body.join('\n');
                }
                directives.push(currentDirective);
            }
            currentDirective = {
                action: line.slice(1).split('(')[0],
                attributes: {},
                body: ''
            };
            let args = line.slice(1).split('(')[1];
            if (args) {
                let argPairs = args.slice(0, -1).split(', ');
                for (let pair of argPairs) {
                    let [key, value] = pair.split(':');
                    currentDirective.attributes[key.trim()] = value.trim();
                }
            }
        } else if (line.startsWith('}')) {
            // End of directive body
            if (Array.isArray(currentDirective.body)) {
                currentDirective.body = currentDirective.body.join('\n');
            }
            directives.push(currentDirective);
            currentDirective = null;
        } else if (currentDirective) {
            // Add line to current directive body
            if (Array.isArray(currentDirective.body)) {
                currentDirective.body.push(line);
            } else {
                currentDirective.body = line;
            }
        }
    }

    if (currentDirective) {
        if (Array.isArray(currentDirective.body)) {
            currentDirective.body = currentDirective.body.join('\n');
        }
        directives.push(currentDirective);
    }

    return directives;
}

export default smarkup;
