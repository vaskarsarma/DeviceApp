jte {
  pipeline_template = "nodejs_continous_integration_quay.groovy"
}

pipeline_template = "nodejs_continous_integration_quay.groovy"


libraries {
    shiftleft {
        language = 'nodejs'
        appName = 'vaskar-nodejsdockerjestlint-app'
        buildExecutablePath = '.'
        appGroup = 'WAMPRES'
    }
    sonarqube {
      sonarScanner  = 'nodejs'
      projectName = 'vaskar-nodejsdockerjestlint-app'
      projectVersion = "1.0"
      sourceDir="src/."
    }
    nodejs {
      npmRegistryUrl = "http://repository.emirates.com/repository/npm-all/"
      nodeEnvironment = "production"
    }
    yelp_detect_secrets {
      excludefiles = ".json|swagger/swagger-ui-bundle.js|swagger/swagger-ui.js"
    }
    quay
    slscan
    trivy
    conftest
}


quay {
  image {
    folder = '.'
    name   = 'vaskar-nodejsdockerjestlint-app'
  }
}

trivy {
  imageTarFilePath = './vaskar-nodejsdockerjestlint-app.tar'
}