import clickOutside from './clickOutside';

// All directives should be imported and added to the 'directives' array
const directives = [clickOutside];

const bindDirectives = (directivesArr = []) => {
  return vm => {
    if (directivesArr.length) {
      directivesArr.forEach(({ name, directive }) => {
        vm.directive(name, directive);
      });
    }
  };
};

export default bindDirectives(directives);
