var command = function (name, description, example, action) {
	this.name = name;
	this.description = description;
	this.example = example;
	this.action = action;
};

var cat = new command(
	"cat", 
	"The cat command reads files and prints them to the standard output.",
	"$ cat sample.txt",
	"cat will read the contents of the file parameter after it.\n" + 
	"If an output is not specified, the default is printing out\n" +
	"the contents of the file to the command line."
);

var traceroute = new command(
	"traceroute",
	"The traceroute command prints the route that packets take to another computer.",
	"$ traceroute apple.com",
	"traceroute is a command that will show you the path a packet\n" +
	"of information takes from your computer to one that you specifiy."
);

var curl = new command(
	"curl",
	"The curl command transfers data using URL syntax.",
	"$ curl http://www.apple.com",
	"curl fetches files from another computer and will send it to standard\n" +
	"output unless otherwise specified. It has a suite of options in how it\n" +
	"will transfer files with certain protocols such as ftp, https, imaps, etc."

);

var ssh = new command(
	"ssh",
	"The ssh command opens an SSH client for remote login.",
	"$ ssh ssmith88@my.cs.lmu.edu",
	"ssh is a program that gives the user the ability to log in to a remote\n" +
	"computer and execute commands on it. It was designed to provide a secure\n" +
	"connection between 2 machines using various protocols and encryptions."
);

var sudo = new command(
	"sudo",
	"The sudo command executes commands as another user.",
	"$ sudo -u root ./setup.sh",
	"sudo allows any permitted user to run a command as though they had the\n" + 
	"permissions of a superuser or another specified user. A password might be \n" +
	"required for authentication."
);

var grep = new command(
	"grep",
	"The grep command is a file pattern searcher.",
	"$ grep \"HTML\" index.html",
	"grep searches for the specified literal string in the files that follow. It will\n" +
	"write all the instances that match the literal string to standard output unless\n" +
	" specified otherwise."
);

var diff = new command(
	"diff",
	"The diff command compares files line by line.",
	"$ diff oldFile.txt newFile.txt",
	"diff compares the specified files. It has a suite of options for filtering the\n" +
	"results of the comparison. It prints the results to standard output unless\n" +
	"specified otherwise."
);

var man = new command(
	"man",
	"The man command displays the manual pages of a specified command.",
	"$ man grep",
	"man will display the on-line manual pages for a given command, format it, and\n" +
	"display it in standard output unless specified otherwise. It outputs the format,\n" +
	"description, and all the options of the command."
);

var script = new command(
	"wc",
	"The wc command displays the word, line, character, and byte count.",
	"$ wc index.html",
	"wc takes a file and writes the number of words, lines, characters, and byte count in it\n" +
	"to standard output unless otherwise specified."
);

var hexdump = new command(
	"hexdump",
	"The hexdump command displays the ASCII, decimal, hexadeciaml, or octal representation of\n" +
	"a file.",
	"$ hexdump file.txt",
	"hexdump by default displays the hexadecimal representation of a specified file and writes it\n" +
	"to standard output unless directed to another location. There are options to display the file\n" +
	"in its decimal, octal, or ASCII representation as well."
);

var bashProfile = new command(
	".bash_profile",
	"The .bash_profile is the personal initialization file executed for login shells. One can edit this\n" +
	"file to change the look of the shell or perform an action when a login shell is opened.",
	null,
	null
);

var path = new command(
	"PATH",
	"PATH is a command line environment variable that specifies the location of directories containing\n" +
	"executable programs.",
	null,
	null
);

var period = new command(
	". (period)",
	"The . (period) can represent the current directory. It can also execute a script if the name of the\n" +
	"script follows a ./ invocation.",
	null,
	null
);

var dollar = new command(
	"$",
	"The $ indicates that the following text is the name of a shell variable that will be used.",
	null,
	null
);

var pipe = new command(
	"|",
	"The | (pipe) passes the output of one command to another. It is a way of redirecting the result of\n" +
	"a previous command.",
	null,
	null
);

var greaterThan = new command(
	">",
	"The > symbol redirects the output of a command to a file. If the file does not exist, it will create\n" +
	"a new file with the specified name and type. If the file does exist, the previous contents will be overwritten\n" +
	"without warning.",
	null,
	null
);

var lessThan = new command(
	"<",
	"The < symbol redirects the standard input of a command.",
	null,
	null
);

var doubleAnd = new command(
	"&&",
	"The && symbol separates 2 sets of commands in which the second command only executes if the\n" +
	"preceding command succeeded.",
	null,
	null
);

var doubleOr = new command(
	"||",
	"The || symbol separates 2 sets of commands in which the second command only executes if the\n" +
	"preceding command fails.",
	null,
	null
);

var star = new command(
	"*",
	"The * symbols acts like a blank when targeting things with certain letters.",
	null,
	null
);

var list = {
	"cat": cat, "traceroute": traceroute, "curl": curl, "ssh": ssh, "sudo": sudo,
	"grep": grep, "diff": diff, "man": man, "script": script, "hexdump": hexdump,
	".bash_profile": bashProfile, "PATH": path, ". (period)": period, "$": dollar, "|": pipe,
	">": greaterThan, "<": lessThan, "&&": doubleAnd, "||": doubleOr, "*": star
};

var updateBox = function (command) {
	var commandObject = list[command];
	$('#commandName').html(commandObject.name);
	var description = (commandObject.description === null ? "" : "Description: " + commandObject.description); 
	$('#description').html(description);
	var example = ((commandObject.example === null) ? "" : "Example: " + commandObject.example);
	$('#example').html(example);
	var action = (commandObject.action === null ? "" : "Action: " + commandObject.action);
	$('#action').html(action);
};

$(function() {
	$("li").on("click", function () {
		var command = $(this).text();
		$('#overlay').fadeIn('fast', function () {
	        $('#box').animate({'top':'160px'}, 500);
	        updateBox(command);
	    });
	});
});

$(function() {
    $('#activator').click(function () {
        $('#overlay').fadeIn('fast', function () {
            $('#box').animate({'top':'160px'}, 500);
        });
    });
    $('#boxclose').click(function () {
        $('#box').animate({'top':'-500px'}, 500, function () {
            $('#overlay').fadeOut('fast');
        });
    });

});
