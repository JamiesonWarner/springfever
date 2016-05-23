// Plan:
// -1a. Rewrite divide. Doesn't take a direction, just divides into a random nearby open square.
// -1b. Rewrite pump. Doesn't take a direction, just raises and lowers the osmotic pressure.
// --> these changes will have the effect of enforcing plants to use communication.

0. Make every system inherit ISystem, and have its own state.
- instance of ISystem represents a single "Object" on that automata which interacts with other Systems.
- instances of systems are properties of the automata object which is passed into the constructor
- therefore systems can depend on each other

1. (Maybe) Make StateController class that implements PerceptronInput

StateController
* Initializes a set of data vectors
* Initializes a Perceptron mapping from PerceptronInputs to
* Each frame, the StateController takes
*
 passes

interface PerceptronInput {
    getInputVector(): Array<number> {

    }
}

== 2. Perceptron control ==

There are two different ways to implement the state control model. These can be used in conjunction:
Let A be the # of actions
1. No internal dynamic state other than the fluid vector. Types are a form of *discrete state*. Create a set of types and assign each type a single action. A set of perceptrons maps state change probability between every type. Thus we have at least *A*^2 perceptrons, each mapping from the fluid vector to l.
2. Dynamic internal state model. Actions are a perceptron on the continuous internal state => *A* . The output of a "continuous state transition" perceptrons with the combined fluid and state vector as input, is additively applied to the state.

== 3. Signalling ==
Signalling is communication between cells, where each cell gets to broadcast some value into the perceptron input of its neighbors, subject to strength falloff over distance.

For physics: Implement parent graphs for cells. This will enable movement.

For optimizing the flow patterns: Enforce a rectangle constraint on CellNetworks. I.e. if two cell networks are adjacent, then their thickness at the line of them  Then integration is easy, and graphics draw well due to symmetry.
