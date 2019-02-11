workflow "Build and deploy" {
  on = "push"
  resolves = ["Alias"]
}

action "Run tests" {
  uses = "./run-tests"
}

action "Deploy" {
  uses = "actions/zeit-now@master"
  needs = "Run tests"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "Alias" {
  uses = "actions/zeit-now@master"
  needs = "Deploy"
  args = "alias"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
