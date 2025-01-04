# Project Rules and Guidelines

## Context Awareness Rules
1. **Always Review Key Project Files First:**
   - `agent_table.md`: Database schema and relationships
   - `agentConnectionWithAgentSettings.md`: Agent connection flow and settings
   - `current_schema.md`: Current database structure
   - `currentStateOfProject.md`: Overall project status
   - `fields.md`: UI fields and their database mappings
   - `log.md`: History of changes and issues

2. **State Management:**
   - Always check if a field needs local state management
   - Consider whether changes need to be synced with Supabase
   - Use appropriate React hooks (useState, useEffect) consistently

## Common Issues and Solutions

### Supabase Connection Issues
1. **Race Conditions:**
   - Problem: Multiple updates causing state conflicts
   - Solution: Implement debouncing for rapid updates
   - Example: Agent name updates should be debounced

2. **Real-time Updates:**
   - Problem: Infinite update loops with Supabase subscriptions
   - Solution: Add update timestamp tracking
   - Implement ignore patterns for self-triggered updates

3. **Data Validation:**
   - Always validate data before sending to Supabase
   - Include error handling for failed database operations
   - Use TypeScript types for data consistency

## Code Quality Guidelines

1. **Component Structure:**
   - Keep components focused and single-responsibility
   - Extract reusable logic into custom hooks
   - Maintain consistent prop interfaces

2. **State Updates:**
   - Use functional updates for state that depends on previous state
   - Avoid direct mutations of state objects
   - Consider using useReducer for complex state logic

3. **Error Handling:**
   - Implement proper error boundaries
   - Log errors appropriately
   - Provide user-friendly error messages

## Best Practices for Supabase Integration

1. **Database Operations:**
   - Use upsert operations when appropriate
   - Implement optimistic updates for better UX
   - Handle offline scenarios gracefully

2. **Real-time Subscriptions:**
   - Clean up subscriptions in useEffect cleanup
   - Filter subscriptions to relevant data only
   - Handle subscription errors properly

3. **Data Fetching:**
   - Implement proper loading states
   - Cache frequently accessed data
   - Use appropriate Supabase query filters

## Project-Specific Rules

1. **Agent Settings:**
   - All agent settings must follow the schema in `agent_table.md`
   - Validate settings against allowed values
   - Maintain backward compatibility with existing agents

2. **UI Components:**
   - Follow existing component patterns
   - Maintain consistent styling with design system
   - Implement proper loading and error states

3. **Performance Considerations:**
   - Minimize unnecessary re-renders
   - Optimize database queries
   - Implement proper memoization where needed

## Development Workflow

1. **Before Making Changes:**
   - Review related documentation
   - Check existing implementations
   - Consider impact on other components

2. **During Implementation:**
   - Follow TypeScript type definitions
   - Add appropriate comments
   - Keep changes focused and atomic

3. **After Changes:**
   - Test all related functionality
   - Update documentation if needed
   - Ensure no regression in existing features

## Documentation Requirements

1. **Code Comments:**
   - Document complex logic
   - Explain non-obvious state management
   - Note any workarounds or temporary solutions

2. **Update Project Files:**
   - Keep `fields.md` in sync with implementation
   - Document new features in appropriate files
   - Update `log.md` with significant changes

Remember: The goal is to maintain a stable, scalable, and maintainable codebase while implementing new features and fixing issues efficiently.