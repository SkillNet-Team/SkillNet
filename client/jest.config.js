module.exports = {
    // Indicates which environment jest should use
    testEnvironment: 'jsdom',
  
    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules', 'src'], // This allows Jest to locate modules using the 'src' directory
};
