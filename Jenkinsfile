node {
	stage('Checkout') {
		checkout scm
	}

	stage('Build') {
		nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install'
			sh 'npm run build'
		}
	}

	stage('Deploy Prod') {
		sh "scp -r output/dist/* ec2-user@ec2-13-59-235-55.us-east-2.compute.amazonaws.com:/usr/share/nginx/html"
	}
}