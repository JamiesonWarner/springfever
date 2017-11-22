== Cellular automata plant growth simulator ==

TODO:
- Implement NEAT search (https://github.com/OptimusLime/neatjs)
- Use a symmetric transport and action function,

This is how transport PRESSURE works...

-- [delta_transport_pressure_x_y] = f(x, y).
-- delta_chemicals_x_y = f(x, y) - f(y, x)

And, of course, the state function:

-- delta_signals_x = g(x)

Also, let there be just 1 type of cell, and change its graphics depending on its behavior.
- green = photosynthesis
- transport (FROM or TO...) (can be negative).


How to run:

1. Install npm and webpack

2. Run `npm install` to install local dependencies

3. Run `webpack --watch` to package TypeScript files

4. Run `npm start` to start the local server

5. Navigate to `http://localhost:8080`