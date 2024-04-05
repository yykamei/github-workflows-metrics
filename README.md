# GitHub Workflows Metrics

GitHub Workflows Metrics is a GitHub Action to measure duration of GitHub Workflows.
This will display charts for each GitHub Workflow, similar to the one shown below, on a GitHub issue.

```mermaid
---
config:
    xyChart:
        width: 900
        xAxis:
            labelPadding: 16
            labelFontSize: 8
        yAxis:
            titlePadding: 16
---
xychart-beta
    title "CI (.github/workflows/ci.yml for status=success)"
    x-axis ["Mar 6", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13", "Mar 14", "Mar 15", "Mar 16", "Mar 17", "Mar 21", "Mar 23", "Mar 24", "Mar 28", "Mar 29", "Mar 30", "Apr 3"]
    y-axis "Duration (average in seconds)"
    bar [38, 39, 37, 42,41, 43, 37, 46, 38,41, 43, 38, 39, 54,41, 42, 69]
```

## Motivation

When running CI with GitHub Actions, it's difficult to see the trend of GitHub workflow execution times.
Wouldn't it be easier to measure the results of efforts to shorten CI execution times
if this trend could be understood at a glance through a chart?
This Action was created with that motivation in mind.

## Usage

You should define a workflow like this:

```yaml
name: GitHub Workflows Metrics
on:
  workflow_dispatch:
  schedule:
    - cron: "30 10 * * *"
permissions:
  actions: read
  issues: write
jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: yykamei/github-workflows-metrics@main
        with:
          only: ci.yml
          status: success
```

## Inputs

| Name      | Description                                                                                      | Required | Default                  |
|-----------|--------------------------------------------------------------------------------------------------|----------|--------------------------|
| range     | The range of time to measure the workflows. This can be: 7days, 14days, 30days                   | false    | 30days                   |
| aggregate | Determines how the workflow metrics should be aggregated. This can be: average, median, min, max | false    | average                  |
| only      | Only the specified workflows will be measured. This is supposed to be comma-separated list       | false    | ""                       |
| status    | Only the workflows with the specified status will be measured.                                   | false    | ""                       |
| label     | The label for GitHub issues that the GitHub Action creates                                       | false    | github-workflows-metrics |
| token     | The GitHub token used to create an authenticated client                                          | false    | ${{ github.token }}      |

## Contributing

Please take a look at the [CONTRIBUTING.md](CONTRIBUTING.md). It's always a pleasure to receive any contributions 😄
