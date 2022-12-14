# Proj1-GenerativeDrawing
From three points on a black canvas, which are a fourth of the canvas' width apart, many drawing agents (borderless circles of small radii) move radially outwards and undergo regular reflections each time they encounter an edge of the canvas. The drawing agents, by default, are colored using a grayscale color. The grayscale color of the drawing agents emanating from the center of the canvas increases by 10 until 255 at which point it resets back to 0. The grayscale color of the drawing agents emanating from the other two points increases by a factor of their current grayscale color, hence giving a flashing effect as they draw. By setting the number of central drawing agents as well as flash agents to 10000, the generative drawing simulates a flocking pattern.
User interaction:-
The drawing starts when the mouse is clicked and the pattern is centered at the mouse pointer position.
Clicking the mouse when the pattern is drawing restarts the drawing from the mouse pointer position.
Pressing 'c' adds color to the drawing agents–a shade of green to the central drawing agents and blue or red to the flash agents. Consecutive 'c' key presses alternates between red and blue colors of the flash agents and two different shades of green for the central drawing agents, essentially alternating between cool and warm color themes.
Pressing 'b' returns the pattern to grayscale color.
Pressing 'r' reverses the direction of the drawing, essentially "undoing" the generative pattern. 
Pressing 'space' toggles between pausing and resuming the drawing.
Pressing 'backspace' restarts the drawing from the center of the canvas.