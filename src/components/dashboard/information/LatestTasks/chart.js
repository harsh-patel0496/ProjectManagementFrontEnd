import palette from '../../../../theme/palette';

export const data = {
  labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6'],
  datasets: [
    {
      label: 'Pending',
      backgroundColor: "#00d0bd",
      data: [18, 5, 19, 27, 29, 19, 20]
    },
    {
      label: 'In Progress',
      backgroundColor: "#5D92F4",
      data: [11, 20, 12, 29, 30, 25, 13]
    },
    {
      label: 'Completed',
      backgroundColor: "#00D014",
      data: [8, 10, 22, 4, 0, 5, 13]
    },
    {
      label: 'Cancelled',
      backgroundColor: "#ff3739",
      data: [3, 4, 1, 0, 2, 4, 6]
    },

  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
