import nox

@nox.session(python=False)
def lint(session):
    session.chdir("winterjs")
    session.run("eslint", "*.js", external=True)

@nox.session(python=False)
def tests(session):
    session.chdir("tests")
    session.run("deno", "lint", "--unstable", ".", external=True)
    session.run(
        "deno",
        "test",
        "--import-map",
        "import_map.json",
        external=True,
    )
