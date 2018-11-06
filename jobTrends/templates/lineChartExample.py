import numpy as np
import plotly.graph_objs as go
import plotly.offline as ply
import plotly.tools as tls


N = 500
random_x = np.linspace(0, 1, N)
random_y = np.random.randn(N)
random_y2 = np.random.randn(N)

# Create a trace
trace1 = go.Scatter(
    x = random_x,
    y = random_y,
    name = "trace 1",
    line = dict(
        color = ("blue"),
    )
)

trace2 = go.Scatter(
    x = random_x,
    y = random_y2,
    name = "trace 2",
    line = dict(
        color = ("orange"),
    )
)

data = [trace1, trace2]

ply.plot(data, filename='basic-line.html')

