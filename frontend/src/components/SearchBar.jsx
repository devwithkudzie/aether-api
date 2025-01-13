import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <motion.div
      initial={false}
      animate={{ width: focused ? 400 : 300 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          width: '100%',
        }}
      >
        <InputBase
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          startAdornment={
            <Search sx={{ ml: 2, mr: 1 }} />
          }
          sx={{ width: '100%', p: 1 }}
        />
        <AnimatePresence>
          {focused && query && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            >
              <SearchSuggestions query={query} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}; 